import * as React from 'react';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowProvider,
  TreeGridRowOnOpenChangeData,
} from '@fluentui-contrib/react-tree-grid';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useEventCallback,
  HeadlessFlatTreeItemProps,
  ForwardRefComponent,
  makeStyles,
  shorthands,
  useFluent,
} from '@fluentui/react-components';
import { isHTMLElement } from '@fluentui/react-utilities';

import {
  FixedSizeList,
  FixedSizeListProps,
  ListChildComponentProps,
} from 'react-window';
import { TreeGridProps } from '../src/components/TreeGrid/TreeGrid.types';
import { ArrowLeft } from '@fluentui/keyboard-keys';

const useStyles = makeStyles({
  cell: {
    ...shorthands.flex(1, 1, '100%'),
  },
});

type Item = {
  children: string;
  value: string;
  parentValue?: string;
};
const defaultItems: Item[] = [
  {
    value: 'flatTreeItem_lvl-1_item-1',
    children: `Level 1, item 1`,
  },
  ...Array.from({ length: 300 }, (_, i) => ({
    value: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentValue: 'flatTreeItem_lvl-1_item-1',
    children: `Item ${i + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-2',
    children: `Level 1, item 2`,
  },
  ...Array.from({ length: 300 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-2--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-2',
    children: `Item ${index + 1}`,
  })),
];

type FixedSizeTreeGridProps = Omit<TreeGridProps, 'children'> & {
  listProps: FixedSizeListProps & { ref?: React.Ref<FixedSizeList> };
};

const FixedSizeTreeGrid: ForwardRefComponent<FixedSizeTreeGridProps> =
  React.forwardRef((props, ref) => {
    const { listProps, ...rest } = props;
    const handleRef = React.useCallback((instance: HTMLElement | null) => {
      if (instance) {
        // This element stays between the treegrid and row
        // Due to accessibility issues this element should have role="none"
        instance.setAttribute('role', 'none');
      }
    }, []);
    return (
      <TreeGrid {...rest} ref={ref}>
        <FixedSizeList
          {...listProps}
          innerRef={handleRef}
          outerRef={handleRef}
        />
      </TreeGrid>
    );
  });

type FixedSizeTreeGridRowProps = ListChildComponentProps<
  HeadlessFlatTreeItemProps[]
>;

const FixedSizeTreeGridRow = React.memo((props: FixedSizeTreeGridRowProps) => {
  const styles = useStyles();
  const item = props.data[props.index];
  const { openItems, requestOpenChange } = useVirtualizationContext();
  return item.parentValue === undefined ? (
    <TreeGridRow
      data-item-id={item.value}
      aria-level={1}
      open={openItems.get(item.value) !== undefined}
      onOpenChange={(ev, data) =>
        requestOpenChange({ ...data, index: props.index })
      }
      style={props.style}
      subtree
    >
      <TreeGridCell className={styles.cell} header>
        {item.children}
      </TreeGridCell>
      <TreeGridCell className={styles.cell} aria-colspan={3}>
        <Button>Header action</Button>
      </TreeGridCell>
    </TreeGridRow>
  ) : (
    <TreeGridRowProvider
      value={{
        open: !!openItems.get(item.parentValue),
        level: 1,
        requestOpenChange,
      }}
    >
      <TreeGridRow data-item-parent-id={item.parentValue} style={props.style}>
        <TreeGridCell className={styles.cell} header>
          {item.children}
        </TreeGridCell>
        <TreeGridCell className={styles.cell}>
          <Button>Chat with participants</Button>
        </TreeGridCell>
        <TreeGridCell className={styles.cell}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button>Toggle menu</Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem>New </MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuItem disabled>Open File</MenuItem>
                <MenuItem>Open Folder</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </TreeGridCell>
        <TreeGridCell className={styles.cell}>
          <Button>Agenda and notes</Button>
        </TreeGridCell>
      </TreeGridRow>
    </TreeGridRowProvider>
  );
});

type VirtualizationContextValue = {
  openItems: Map<PropertyKey, number>;
  requestOpenChange: (
    data: TreeGridRowOnOpenChangeData & { index: number }
  ) => void;
};

const VirtualizationContext = React.createContext<
  VirtualizationContextValue | undefined
>(undefined);

const useVirtualizationContext = () => {
  const context = React.useContext(VirtualizationContext);
  if (!context) {
    throw new Error(
      'useVirtualizationContext must be used within a VirtualizationProvider'
    );
  }
  return context;
};

export const Virtualization = () => {
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;

  const [openItems, setOpenItems] = React.useState(
    () => new Map<PropertyKey, number>()
  );

  const requestOpenChange = useEventCallback(
    (data: TreeGridRowOnOpenChangeData & { index: number }) => {
      const row = data.event.currentTarget;
      if (isHTMLElement(row)) {
        const id = row.dataset.itemId;
        if (id) {
          setOpenItems((prev) => {
            const next = new Map(prev);
            if (data.open) {
              next.set(id, data.index);
            } else {
              next.delete(id);
            }
            return next;
          });
        }
      }
    }
  );

  const visibleItems = React.useMemo(
    () =>
      defaultItems.filter(
        (item) =>
          item.parentValue === undefined ||
          openItems.get(item.parentValue) !== undefined
      ),
    [openItems]
  );

  const listRef = React.useRef<FixedSizeList>(null);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === ArrowLeft && isHTMLElement(event.target)) {
        const parentId = event.target.dataset.itemParentId;
        if (!parentId) {
          return;
        }
        const index = openItems.get(parentId);
        if (index !== undefined && win && doc) {
          listRef.current?.scrollToItem(index, 'smart');
          win.requestAnimationFrame(() => {
            doc
              .querySelector<HTMLElement>(`[data-item-id="${parentId}"]`)
              ?.focus();
          });
        }
      }
    },
    [openItems]
  );

  return (
    <VirtualizationContext.Provider
      value={React.useMemo(
        () => ({ openItems, requestOpenChange }),
        [openItems]
      )}
    >
      <FixedSizeTreeGrid
        onKeyDown={handleKeyDown}
        aria-label="TreeGrid with virtualization"
        listProps={{
          ref: listRef,
          height: 500,
          itemCount: visibleItems.length,
          itemSize: 32,
          width: '100%',
          itemData: visibleItems,
          children: FixedSizeTreeGridRow,
        }}
      />
    </VirtualizationContext.Provider>
  );
};
