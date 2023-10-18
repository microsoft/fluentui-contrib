import * as React from 'react';
import { DataGrid, DataGridBody, CellRenderer, DataGridHeaderRow } from '@fluentui-contrib/react-data-grid-react-window-grid';
import { Meta } from '@storybook/react';
import {CalendarClock16Regular } from '@fluentui/react-icons';
import { DataGridCell, makeStyles, DataGridHeader, DataGridHeaderCell, TableCellLayout, TableColumnDefinition, createTableColumn, tokens } from '@fluentui/react-components';
import { GridOnScrollProps } from 'react-window';

export default {
    component: DataGrid,
    title: 'DataGrid'
} as Meta;

/**
 * A type guard for column id. It has a format with a prefix `column` and a number.
 */
type ColumnIdPrefix = `column${number}`;

/**
 * The data structure for the table preview UI. Both DetailsList and DataGrid requires an array of
 * objects to present the table data. It is a record with column id as key and string as value.
 * index field is required by data grid to render the index column.
 */
type TableUIData = { index: number } & Record<ColumnIdPrefix, string>;

const useStyles = makeStyles({
    tableHeader: {
        position: 'relative',
        width: '1000px',
    },
    headerCell: {
        whiteSpace: 'nowrap',
    }
});

const columnWidthConstant = 120;

function getColumnDefinitions(
    columns: string[]
  ): TableColumnDefinition<TableUIData>[] {
    const columnDefinitions: TableColumnDefinition<TableUIData>[] = [];
    columns.forEach((column, index) => {
      const columnDef = createTableColumn({
        columnId: `column${index}`,
        compare(a, b) {
          return a[`column${index}`].localeCompare(b[`column${index}`]);
        },
        renderHeaderCell: () => {
          return (
            <TableCellLayout media={<CalendarClock16Regular />}>
              {column}
            </TableCellLayout>
          );
        },
        renderCell: (item: TableUIData) => {
          return (
            <TableCellLayout truncate title={item[`column${index}`]}>
              {item[`column${index}`]}
            </TableCellLayout>
          );
        },
      });
      columnDefinitions.push(columnDef);
    });
    return columnDefinitions;
}

const generateTableArrays = (rowCount: number, columnCount: number) => {
    const result: TableUIData[] = [];
    for (let i = 0; i < rowCount; i += 1) {
        const row: any = {}
        for (let j = 0; j < columnCount; j++) {
            row[`column${j}`] = `r${i} c${j}`;
        }
        result.push(row);
    }
    return result;
};

export const VirtualizedDataGrid: React.FunctionComponent = () => {
    const columns = getColumnDefinitions([...new Array(50)].map((v, index) => `Column ${index}`));
    const items = generateTableArrays(1000, 50);
    const styles = useStyles();

    const cellRenderer: CellRenderer<TableUIData> = ({ item, rowId}, style, index, column) => {
        item['index'] = index + 1;
        return (
            <DataGridCell style={{...style, boxSizing: 'border-box'}}>
                {column.renderCell(item)}
            </DataGridCell>
        );
    };

    const headerContainer: React.Ref<HTMLDivElement> = React.useRef(null);

    const scrollToLeft = (scrollLeft: number) => {
        (headerContainer && (headerContainer?.current as HTMLElement).firstChild as HTMLElement)?.scrollTo({ left: scrollLeft});
    };

    return (
            <DataGrid focusMode='cell' noNativeElements
                sortable
                style={{minWidth: 'unset'}}
                items={items}
                columns={columns}
                size={'medium'}
            >
                <DataGridHeader className={styles.tableHeader}>
                    <DataGridHeaderRow<TableUIData> ref={headerContainer} itemSize={columnWidthConstant} height={42} width={20000}>
                        {({ columnId, renderHeaderCell }, style) => {
                            return (
                                <DataGridHeaderCell
                                    className={styles.headerCell}
                                    as="div"
                                    style={style}
                                >
                                    {renderHeaderCell()}
                                </DataGridHeaderCell>
                            );
                        }}
                    </DataGridHeaderRow>
                </DataGridHeader>
                <DataGridBody<TableUIData>
                    rowHeight={44}
                    height={500}
                    width={1000}
                    columnWidth={columnWidthConstant}
                    gridProps={{
                        onScroll: (props: GridOnScrollProps) => {
                            if(props.horizontalScrollDirection) {
                                scrollToLeft(props.scrollLeft)
                            }
                        }
                    }}
                >
                    {cellRenderer}
                </DataGridBody>


            </DataGrid>
    );
};
