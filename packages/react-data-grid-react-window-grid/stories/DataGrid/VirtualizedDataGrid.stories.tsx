import * as React from 'react';
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  CellRenderer,
  DataGridHeaderRow,
  DataGridHeaderCell,
} from '@fluentui-contrib/react-data-grid-react-window-grid';
import { Meta } from '@storybook/react';
import { CalendarClock16Regular } from '@fluentui/react-icons';
import {
  makeStyles,
  DataGridHeader,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

export default {
  component: DataGrid,
  title: 'DataGrid',
} as Meta;

/**
 * A type guard for column id. It has a format with a prefix `column` and a number.
 */
type ColumnIdPrefix = `column${number}`;

type TableUIData = Record<ColumnIdPrefix, string>;

const useStyles = makeStyles({
  tableHeader: {
    position: 'relative',
    width: '1000px',
  },
  headerCell: {
    whiteSpace: 'nowrap',
  },
});

const COLUMN_WIDTH= 120;

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
    const row: TableUIData = {};
    for (let j = 0; j < columnCount; j++) {
      row[`column${j}`] = `r${i} c${j}`;
    }
    result.push(row);
  }
  return result;
};

const cellRenderer: CellRenderer<TableUIData> = ({ item }, column, style) => {
  return (
    <DataGridCell style={{ ...style, boxSizing: 'border-box' }}>
      {column.renderCell(item)}
    </DataGridCell>
  );
};

export const VirtualizedDataGrid: React.FunctionComponent = () => {
  const columns = getColumnDefinitions(
    [...new Array(50)].map((v, index) => `Column ${index}`)
  );
  const items = generateTableArrays(1000, 50);
  const styles = useStyles();

  return (
    <DataGrid
      focusMode="cell"
      noNativeElements
      sortable
      items={items}
      columns={columns}
      size={'medium'}
    >
      <DataGridHeader className={styles.tableHeader}>
        <DataGridHeaderRow<TableUIData>
          itemSize={COLUMN_WIDTH}
          height={42}
          width={20000}
        >
          {({ renderHeaderCell }, style) => {
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
        columnWidth={COLUMN_WIDTH}
      >
        {cellRenderer}
      </DataGridBody>
    </DataGrid>
  );
};
