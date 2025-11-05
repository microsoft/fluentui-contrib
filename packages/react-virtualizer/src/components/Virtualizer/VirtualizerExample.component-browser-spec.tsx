import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
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

  const renderChild = React.useCallback(
    (index: number) => {
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
    },
    [items, items.length]
  );

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
          {renderChild}
        </Virtualizer>
      </div>
    </div>
  );
};
