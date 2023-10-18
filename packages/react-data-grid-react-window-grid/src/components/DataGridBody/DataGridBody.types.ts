import * as React from 'react';
import type {
  TableRowData,
  DataGridBodyProps as DataGridBodyPropsBase,
  DataGridBodySlots as DataGridBodySlotsBase,
  DataGridBodyState as DataGridBodyStateBase,
  DataGridContextValue,
  TableColumnDefinition,
} from '@fluentui/react-components';
import { FixedSizeGridProps, GridChildComponentProps } from 'react-window';

export type DataGridBodySlots = DataGridBodySlotsBase;

export type CellRenderer<TItem = unknown> = (
  row: TableRowData<TItem>,
  column: TableColumnDefinition<TItem>,
  style: React.CSSProperties,
  /**
   * The index of each row
   */
  index: number,
) => React.ReactNode;
/**
 * DataGridBody Props
 */
export type DataGridBodyProps<TItem = unknown> = Omit<
  DataGridBodyPropsBase,
  'children'
> & {
  /**
   * The size of each row, rowHeight
   */
  rowHeight: number;
  /**
   * The width per column
   */
  columnWidth: number;
  /**
   * The height of the virtualized container
   */
  height: number;
  /**
   * The width of the virtualized container
   */
  width: number;
  /**
   * Children render function for rows
   */
  children: CellRenderer<TItem>;
  /**
   * All virtualized rows must have the [aria-rowindex](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-rowindex)
   * attribute for correct screen reader navigation. The default start index is 2 since we assume that there is only
   * one row in the header. If this is not the case, the start index can be reconfigured through this prop.
   * @default 2
   */
  ariaRowIndexStart?: number;

  /**
   * Optional props to pass through to the FixedSizeGrid component from react-window
   *
   * @see https://react-window.vercel.app/#/api/FixedSizeGrid
   */
  gridProps?: Partial<FixedSizeGridProps>;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = Omit<DataGridBodyStateBase, 'renderRow'> &
    Pick<DataGridBodyProps, 'rowHeight' | 'height' | 'columnWidth'> &
    Pick<DataGridContextValue, 'columns'> &
    Pick<Required<DataGridBodyProps>, 'width' | 'ariaRowIndexStart'> & {
      virtualizedCell: (props: GridChildComponentProps) => React.ReactElement;
} & {
  gridProps?: Partial<FixedSizeGridProps>;
};;
