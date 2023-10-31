import {
  DataGridContextValue,
  DataGridRowProps,
  DataGridRowState,
  TableColumnDefinition,
} from '@fluentui/react-components';
import { FixedSizeListProps, ListChildComponentProps } from 'react-window';

export type CellRenderer<TItem = unknown> = (
  column: TableColumnDefinition<TItem>,
  style: React.CSSProperties,
  dataGridContextValue: DataGridContextValue,
  /**
   * The index of each row
   */
  index: number
) => React.ReactNode;

export type DataGridHeaderRowProps<TItem = unknown> = Omit<
  DataGridRowProps,
  'children'
> & {
  /**
   * The size of each column
   */
  itemSize: number;
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
  ariaColumnIndexStart?: number;

  /**
   * Optional props to pass through to the FixedSizeList component from react-window
   *
   * @see https://react-window.vercel.app/#/api/FixedSizeList
   */

  listProps?: Partial<FixedSizeListProps>;
  /**
   * Ref of the virtualized list container ref, this is used for sticky header horizontal scroll bar with body scroll bar, and usage is we should
   * add RowHeaderContextProvider outside of <DataGrid>:
   * <RowHeaderContextProvider value={{ listRef: headerContainer }}>
   *    <DataGrid />
   * </RowHeaderContextProvider>
   */
  listRef?: React.MutableRefObject<HTMLDivElement | null>;
};

/**
 * State used in rendering DataGridRow
 */
export type DataGridHeaderRowState = Omit<DataGridRowState, 'renderCell'> &
  Pick<
    DataGridHeaderRowProps,
    'itemSize' | 'height' | 'width' | 'ariaColumnIndexStart' | 'listProps'
  > & {
    virtualizedCell: (props: ListChildComponentProps) => React.ReactElement;
  } & {
    /**
     * Ref of the virtualized list container ref
     */
    listRef: React.MutableRefObject<HTMLDivElement | null>;
  };
