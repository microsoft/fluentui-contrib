import * as React from 'react';
import { DataGrid, DataGridBody, CellRenderer, DataGridRow } from '@fluentui-contrib/react-data-grid-react-window-grid';
import { Meta } from '@storybook/react';
import {CalendarClock16Regular } from '@fluentui/react-icons';
import { DataGridCell, makeStyles, DataGridHeader, DataGridHeaderCell, TableCellLayout, TableColumnDefinition, createTableColumn, shorthands, tokens, useTableFeatures, useTableSelection, useTableSort, TableColumnId, TableColumnSizingOptions } from '@fluentui/react-components';

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
    tableRow: { // remove extra style on row in fluentui
        userSelect: 'none',
        ':hover': {
            backgroundColor: tokens.colorSubtleBackground,
            color: tokens.colorNeutralForeground1Hover,
        },
        ':active': { // Pressed
            backgroundColor: tokens.colorSubtleBackground,
            color: tokens.colorNeutralForeground1Pressed,
        },
    },
    tableHeader: {
        position: 'relative',
        ...shorthands.overflow('hidden'),
    },
    headerCell: {
        whiteSpace: 'nowrap',
        display: 'flex',
        userSelect: 'none',
        width: '80px'
    }
});

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
    const columnResizingOptions: TableColumnSizingOptions = {};
    [...new Array(50)].map((v, index) => {
            columnResizingOptions[`column${index}`] = { idealWidth: 80, minWidth: 0 };
        });

    const cellRenderer: CellRenderer<TableUIData> = ({ item, rowId}, style, index, column) => {
        item['index'] = index + 1;
        return (
                  <DataGridCell style={style}
                  >{column.renderCell(item)}</DataGridCell>
        );
    };

    const headerContainer: React.Ref<HTMLDivElement> = React.useRef(null);
    const bodyContainer: React.Ref<HTMLDivElement> = React.useRef(null);

    const scrollToLeft = (scrollLeft: number) => {
        headerContainer && (headerContainer?.current as HTMLElement).scrollTo({ left: scrollLeft});
        const bodyChildren = bodyContainer && bodyContainer?.current?.children;
        if( bodyChildren) {
            (Array.from(bodyChildren)[0] as HTMLElement).scrollTo({ left: scrollLeft });
        }
    };

    // bundle scroll bar horizontal of the child List component of DataGridBody: to make both header and body scroll horizontally
    React.useEffect(() => {
        const bodyChildren = bodyContainer && bodyContainer?.current?.children;
        if( bodyChildren) {
            const handleScroll = (event) => {
                scrollToLeft((Array.from(bodyChildren)[0] as HTMLElement).scrollLeft);
            };

            (Array.from(bodyChildren)[0] as HTMLElement).addEventListener('scroll', handleScroll);
        }
    }, []);

    return (
            <DataGrid focusMode='cell' noNativeElements
                resizableColumns
                columnSizingOptions={columnResizingOptions}
                sortable
                style={{minWidth: 'unset'}}
                items={items}
                columns={columns}
                size={'medium'}
            >
              <div role='grid' className={styles.tableHeader} ref={headerContainer}>
                  <DataGridHeader>
                        <DataGridRow<TableUIData>>
                            {({ columnId, renderHeaderCell }, tableFeaturesState) => {
                                return (
                                    <DataGridHeaderCell
                                        className={styles.headerCell}
                                        as="div"
                                    >
                                        {renderHeaderCell()}
                                    </DataGridHeaderCell>
                                );
                            }}
                        </DataGridRow>
                    </DataGridHeader>
              </div>

                    <DataGridBody<TableUIData>
                        itemSize={24}
                        height={500}
                        width={1000}
                        columnWidth={100}
                        ref={bodyContainer}
                    >
                        {cellRenderer}
                    </DataGridBody>


            </DataGrid>
    );
};
