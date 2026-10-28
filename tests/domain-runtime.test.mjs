import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { request } from 'node:http';
import { createServer } from 'node:net';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const wranglerCli = path.join(
  repositoryRoot,
  'node_modules',
  'wrangler',
  'bin',
  'wrangler.js'
);

async function availablePort() {
  const server = createServer();
  server.unref();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert(address && typeof address !== 'string');
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  return address.port;
}

function localRequest(port, hostname, pathname) {
  return new Promise((resolve, reject) => {
    const outgoing = request(
      {
        host: '127.0.0.1',
        port,
        path: pathname,
        method: 'GET',
        headers: { Host: hostname }
      },
      (response) => {
        response.resume();
        response.once('end', () => resolve(response));
      }
    );
    outgoing.once('error', reject);
    outgoing.end();
  });
}

test(
  'Wrangler routes generated pages through the migration redirect handler',
  { timeout: 45_000 },
  async (context) => {
    const port = await availablePort();
    const child = spawn(
      process.execPath,
      [
        wranglerCli,
        'dev',
        '--local',
        '--ip',
        '127.0.0.1',
        '--port',
        String(port),
        '--var',
        'WWW_REDIRECT_ENABLED:true',
        '--var',
        'LEGACY_DOMAIN_REDIRECT_ENABLED:false',
        '--var',
        'PRIMARY_SITE_ORIGIN:https://clearstance.eu'
      ],
      {
        cwd: repositoryRoot,
        env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    let output = '';
    child.stdout.on('data', (chunk) => {
      output += chunk;
    });
    child.stderr.on('data', (chunk) => {
      output += chunk;
    });

    context.after(async () => {
      if (child.exitCode === null) {
        child.kill('SIGTERM');
        await Promise.race([once(child, 'exit'), delay(5_000)]);
      }
    });

    let response;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      if (child.exitCode !== null) {
        assert.fail(`Wrangler exited before becoming ready.\n${output}`);
      }
      try {
        response = await localRequest(
          port,
          'www.clearstance.eu',
          '/en/?source=runtime-test'
        );
        break;
      } catch {
        await delay(100);
      }
    }

    assert(response, `Wrangler did not become ready.\n${output}`);
    assert.equal(response.statusCode, 308);
    assert.equal(
      response.headers.location,
      'https://clearstance.eu/en/?source=runtime-test'
    );
  }
);
