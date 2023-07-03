# @fluentui-contrib/react-chat

A variant of the Fluent UI [DataGrid](https://react.fluentui.dev/?path=/docs/components-datagrid--default) that is
virtualized using [react-window](https://react-window.vercel.app/#/examples/list/fixed-size).

## Try it out

```sh
yarn add @fluentui-contrib/react-data-grid-react-window

npm install @fluentui-contrib/react-data-grid-react-window
```

```tsx
import * as React from 'react';
import { TableColumnDefinition, createTableColumn, TableCellLayout, useScrollbarWidth, useFluent } from '@fluentui/react-components';
import { DataGridBody, DataGrid, DataGridRow, DataGridHeader, DataGridCell, DataGridHeaderCell, RowRenderer } from '@fluentui-contrib/react-data-grid-react-window';

type FileCell = {
  label: string;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
};

type AuthorCell = {
  label: string;
};

type Item = {
  index: number;
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const baseItems = [
  {
    file: { label: 'Meeting notes' },
    author: { label: 'Max Mustermann' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
    },
  },
  {
    file: { label: 'Thursday presentation' },
    author: { label: 'Erika Mustermann' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Training recording' },
    author: { label: 'John Doe' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Purchase order' },
    author: { label: 'Jane Doe' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
    },
  },
];

const items = new Array(1500).fill(0).map((_, i) => ({ ...baseItems[i % baseItems.length], index: i }));

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          <strong>[{item.index}] </strong>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.author.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

const renderRow: RowRenderer<Item> = ({ item, rowId }, style) => (
  <DataGridRow<Item> key={rowId} style={style}>
    {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
  </DataGridRow>
);

export const VirtualizedDataGrid = () => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  return (
    <DataGrid items={items} columns={columns}>
      <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
        <DataGridRow>{({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}</DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item> itemSize={50} height={400}>
        {renderRow}
      </DataGridBody>
    </DataGrid>
  );
};
```
