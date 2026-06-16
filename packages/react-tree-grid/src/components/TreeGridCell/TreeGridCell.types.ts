import type { ComponentProps, Slot } from '@fluentui/react-components';

/**
 * Slots available on a TreeGridCell.
 */
export type TreeGridCellSlots = {
  root: Slot<'div'>;
};

/**
 * Props for a TreeGridCell.
 *
 * Set `header` to render the cell as a row header instead of a grid cell.
 */
export type TreeGridCellProps = Omit<
  ComponentProps<TreeGridCellSlots>,
  'header'
> & {
  header?: boolean;
};
