# Sveltia CMS Authenticator

The CMS OAuth service is intentionally isolated from the ClearStance website
Worker. Use the current official
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)
project rather than copying OAuth code or credentials into this repository.

The authenticator and Sveltia CMS are MIT-licensed. The authenticator is a
small Cloudflare Worker and does not store ClearStance content.

## Production setup

1. Deploy the official `sveltia/sveltia-cms-auth` repository to a dedicated
   Cloudflare Worker.
2. Register a GitHub OAuth App:
   - Homepage URL: `https://clearstance.pl/admin/`
   - Authorization callback URL: `<AUTH_WORKER_URL>/callback`
3. Add these variables to the authenticator Worker:
   - `GITHUB_CLIENT_ID`: the OAuth App client ID;
   - `GITHUB_CLIENT_SECRET`: the OAuth App client secret, encrypted;
   - `ALLOWED_DOMAINS`: `clearstance.pl`.
4. Replace the two explicit markers in `public/admin/config.yml`:
   - `REPLACE_WITH_GITHUB_OWNER`;
   - `https://REPLACE_WITH_AUTH_WORKER.workers.dev`.
5. Keep `auth_methods: [oauth]`. Do not place a personal access token,
   client secret, or access token in the CMS configuration.

The GitHub user signing into `/admin/` must have write access to the production
repository. Sveltia then writes Markdown and media changes as Git commits.
