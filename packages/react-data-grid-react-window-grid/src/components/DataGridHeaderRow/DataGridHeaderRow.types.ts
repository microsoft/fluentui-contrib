import {
  DataGridContextValue,
  DataGridRowProps,
  DataGridRowState,
  TableColumnDefinition,
} from '@fluentui/react-components';
import { FixedSizeListProps, ListChildComponentProps } from 'react-window';

export type HeaderCellRenderer<TItem = unknown> = (
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
   * Children render function for cell
   */
  children: HeaderCellRenderer<TItem>;

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
    'itemSize' | 'height' | 'width' | 'listProps'
  > & {
    virtualizedCell: (props: ListChildComponentProps) => React.ReactElement;
  } & {
    /**
     * Ref of the virtualized list container ref
     */
    listRef: React.MutableRefObject<HTMLDivElement | null>;
  };
