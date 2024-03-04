import type { ComponentProps, Slot } from '@fluentui/react-components';

export type TreeGridCellSlots = {
  root: Slot<'div'>;
};
export type TreeGridCellProps = Omit<
  ComponentProps<TreeGridCellSlots>,
  'header'
> & {
  header?: boolean;
};
