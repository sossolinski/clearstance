import type { IconName } from './icon-map';

export const SERVICE_ICON_NAMES = [
  'network',
  'task-list',
  'message-text',
  'community'
] as const satisfies readonly IconName[];

export function getServiceIconName(index: number): IconName {
  const iconName = SERVICE_ICON_NAMES[index];

  if (!iconName) {
    throw new Error(`No service icon is assigned to item ${index + 1}.`);
  }

  return iconName;
}
