import { ComponentProps, Slot } from '@fluentui/react-components';

export type TreeGridSlots = {
  root: Slot<'div'>;
};

export type TreeGridProps = ComponentProps<TreeGridSlots>;
