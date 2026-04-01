import type { DrawerProps } from '@fluentui/react-drawer';

export type DrawerBaseState = Required<Pick<DrawerProps, 'position' | 'size'>>;
