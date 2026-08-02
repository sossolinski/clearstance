import arrowSeparateVertical from 'iconoir/icons/arrow-separate-vertical.svg?raw';
import checkCircle from 'iconoir/icons/check-circle.svg?raw';
import community from 'iconoir/icons/community.svg?raw';
import compass from 'iconoir/icons/compass.svg?raw';
import dataTransferBoth from 'iconoir/icons/data-transfer-both.svg?raw';
import group from 'iconoir/icons/group.svg?raw';
import mapsArrowDiagonal from 'iconoir/icons/maps-arrow-diagonal.svg?raw';
import messageText from 'iconoir/icons/message-text.svg?raw';
import network from 'iconoir/icons/network.svg?raw';
import taskList from 'iconoir/icons/task-list.svg?raw';

export const iconAllowlist = {
  'arrow-separate-vertical': arrowSeparateVertical,
  'check-circle': checkCircle,
  community,
  compass,
  'data-transfer-both': dataTransferBoth,
  group,
  'maps-arrow-diagonal': mapsArrowDiagonal,
  'message-text': messageText,
  network,
  'task-list': taskList
} as const;

export type IconName = keyof typeof iconAllowlist;
