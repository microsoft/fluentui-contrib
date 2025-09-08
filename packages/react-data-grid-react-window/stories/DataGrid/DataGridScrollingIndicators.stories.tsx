import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import {
  TableColumnDefinition,
  createTableColumn,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  useScrollbarWidth,
  useFluent,
  TableCellActions,
  Menu,
  MenuTrigger,
  MenuItem,
  MenuList,
  MenuPopover,
  Button,
  Skeleton,
  SkeletonItem,
} from '@fluentui/react-components';
import {
  DataGridBody,
  DataGrid,
  DataGridRow,
  DataGridHeader,
  DataGridCell,
  DataGridHeaderCell,
  RowRenderer,
} from '@fluentui-contrib/react-data-grid-react-window';

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
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
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const items = new Array(1500)
  .fill(0)
  .map((_, i) => ({ ...baseItems[i % baseItems.length], index: i }));

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.file.icon}>
          <strong>[{item.index}] </strong>
          {item.file.label}
          <TableCellActions>
            <Menu>
              <MenuTrigger>
                <Button
                  appearance="subtle"
                  aria-label="more"
                  icon={<MoreHorizontalRegular />}
                />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>Item</MenuItem>
                  <MenuItem>Item</MenuItem>
                  <MenuItem>Item</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </TableCellActions>
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={<Avatar badge={{ status: item.author.status }} />}
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

/**
 * Props for the react-window list component to enable scrolling indicators.
 */
const listProps = { useIsScrolling: true };

const CellShimmer = React.memo(function CellShimmer() {
  return (
    <Skeleton style={{ width: '100%' }}>
      <SkeletonItem
        shape="rectangle"
        animation="pulse"
        appearance="translucent"
      />
    </Skeleton>
  );
});

const renderRow: RowRenderer<Item> = (
  { item, rowId },
  style,
  _,
  isScrolling
) => (
  <DataGridRow<Item> key={rowId} style={style}>
    {({ renderCell }) => (
      <DataGridCell focusMode="group">
        {isScrolling ? <CellShimmer /> : renderCell(item)}
      </DataGridCell>
    )}
  </DataGridRow>
);

export const DataGridScrollingIndicators = () => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  return (
    <DataGrid
      items={items}
      columns={columns}
      focusMode="cell"
      sortable
      selectionMode="multiselect"
    >
      <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item> itemSize={50} height={400} listProps={listProps}>
        {renderRow}
      </DataGridBody>
    </DataGrid>
  );
};

DataGridScrollingIndicators.parameters = {
  docs: {
    description: {
      story: [
        'As VirtualizedDataGrid relies on [FixedSizeList](https://react-window.vercel.app/#/examples/list/fixed-size),',
        "you may want to pass some props directly to it. If your component's items are expensive to render,",
        'you can boost performance by rendering a placeholder while the user is scrolling.',
        'To do this, add the `useIsScrolling` property to your List or Grid.',
        'Now an additional parameter, `isScrolling`, will be passed to your render method.',
        'In this example, we render a shimmer effect while the user is scrolling.',
      ].join('\n'),
    },
  },
};
