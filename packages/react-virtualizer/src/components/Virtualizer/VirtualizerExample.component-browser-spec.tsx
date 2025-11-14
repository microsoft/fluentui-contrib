import * as React from 'react';
import {
  Combobox,
  FluentProvider,
  Option,
  makeStyles,
  useId,
  useMergedRefs,
  useTimeout,
  webLightTheme,
} from '@fluentui/react-components';
import { Virtualizer } from './Virtualizer';
import { useStaticVirtualizerMeasure } from '../../hooks/useVirtualizerMeasure';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    height: '500px',
    border: '1px solid #ccc',
  },
  child: {
    height: '50px',
    lineHeight: '50px',
    width: '100%',
    borderBottom: '1px solid #eee',
    padding: '0 10px',
  },
  keyTestContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    height: '400px',
    border: '1px solid #ccc',
  },
  item: {
    height: '50px',
    lineHeight: '50px',
    padding: '0 10px',
    borderBottom: '1px solid #eee',
  },
  button: {
    marginBottom: '10px',
    padding: '8px 16px',
  },
});

interface VirtualizerExampleProps {
  numItems?: number;
  itemSize?: number;
}

export interface VirtualizerItem {
  id: string;
  value: number;
}

export const VirtualizerExample: React.FC<VirtualizerExampleProps> = ({
  numItems = 1000,
  itemSize = 50,
}) => {
  const styles = useStyles();

  const [items, setItems] = React.useState<VirtualizerItem[]>(
    Array.from({ length: numItems }, (_, i) => ({
      id: `item-${i}`,
      value: i,
    }))
  );

  const handleAddItem = () => {
    const nextId = items.length;
    const newItem: VirtualizerItem = {
      id: `item-${nextId}`,
      value: nextId,
    };
    setItems((prev) => [newItem, ...prev]); // Prepend to beginning
  };

  const handleAddMultipleItems = () => {
    const newItems: VirtualizerItem[] = [];
    const nextId = items.length;
    for (let i = 0; i < 10; i++) {
      newItems.push({
        id: `item-${nextId + i}`,
        value: nextId + i,
      });
    }
    setItems((prev) => [...newItems, ...prev]); // Prepend multiple items
  };

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
  } = useStaticVirtualizerMeasure({
    defaultItemSize: itemSize,
  });

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleAddItem}
        data-testid="add-item-button"
      >
        Add Item
      </button>
      <button
        className={styles.button}
        onClick={handleAddMultipleItems}
        data-testid="add-multiple-button"
      >
        Add 10 Items
      </button>
      <div
        className={styles.keyTestContainer}
        role="list"
        ref={scrollRef}
        data-testid="scroll-container"
        aria-label="Virtualizer Example"
      >
        <Virtualizer
          numItems={items.length}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={50}
          containerSizeRef={containerSizeRef}
        >
          {(index) => {
            const item = items[index];
            return (
              <div
                key={item.id} // Unique key based on item ID, not index
                role="listitem"
                className={styles.item}
                data-testid={item.id}
                data-value={item.value}
                aria-posinset={index + 1}
                aria-setsize={items.length}
              >
                Item {item.value}
              </div>
            );
          }}
        </Virtualizer>
      </div>
    </div>
  );
};

const useComboboxStyles = makeStyles({
  listbox: {
    // maxHeight will be applied only positioning autoSize set.
    maxHeight: '250px',
  },
  option: {
    height: '32px',
  },
});

export const VirtualizerComboboxExample = () => {
  const comboId = useId('combobox');

  //This should include the item height (32px) and account for rowGap (2px)
  const itemHeight = 32;
  const rowGap = 2;

  const [options] = React.useState([
    { id: 0, name: 'a' },
    { id: 1, name: 'b' },
    { id: 2, name: 'c' },
    { id: 3, name: 'd' },
    { id: 4, name: 'e' },
    { id: 5, name: 'f' },
    { id: 6, name: 'g' },
    { id: 7, name: 'h' },
    { id: 8, name: 'i' },
    { id: 9, name: 'j' },
    { id: 10, name: 'k' },
  ]);

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
  } = useStaticVirtualizerMeasure({
    defaultItemSize: itemHeight,
    direction: 'vertical',
    // We want at least 10 additional items on each side of visible items for page up/down (+ 1 buffer)
    bufferItems: 4,
    // We need to recalculate index when at least 10 items (+1px) from the bottom or top for page up/down
    bufferSize: itemHeight * 3 + 1,
  });
  const selectedIndex = React.useRef(0);

  const styles = useComboboxStyles();
  const mergedRefs = useMergedRefs(scrollRef);
  // Scroll timer required to post scrollTo on stack post-open state change
  const [setScrollTimer, clearScrollTimer] = useTimeout();

  return (
    <FluentProvider theme={webLightTheme}>
      <label htmlFor={`${comboId}`}>Medium</label>
      <Combobox
        id={`${comboId}`}
        placeholder="Select a number"
        positioning={{ autoSize: 'width' }}
        listbox={{ ref: mergedRefs, className: styles.listbox }}
        onOpenChange={(e, data) => {
          clearScrollTimer();
          if (data.open) {
            setScrollTimer(() => {
              mergedRefs.current?.scrollTo({
                top: (itemHeight + rowGap) * selectedIndex.current,
              });
            }, 0);
          }
        }}
        onOptionSelect={(_, data) => {
          if (data.optionValue) {
            selectedIndex.current = parseInt(data.optionValue, 10);
          }
        }}
        inlinePopup
      >
        <Virtualizer
          numItems={options.length}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={itemHeight}
          containerSizeRef={containerSizeRef}
          gap={rowGap}
        >
          {(index: number) => {
            return (
              <Option
                className={styles.option}
                aria-posinset={index}
                aria-setsize={options.length}
                key={`item-${index}`}
                value={index.toString()}
                data-testid={`option-${index}`}
              >
                {options[index].name}
              </Option>
            );
          }}
        </Virtualizer>
      </Combobox>
    </FluentProvider>
  );
};
