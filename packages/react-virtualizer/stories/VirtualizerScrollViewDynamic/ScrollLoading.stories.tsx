import * as React from 'react';
import { VirtualizerScrollViewDynamic } from '@fluentui/react-virtualizer';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  child: {
    lineHeight: '42px',
    width: '100%',
    minHeight: '42px',
  },
});

export const ScrollLoading = () => {
  const styles = useStyles();
  const childLength = 1000;
  const minHeight = 42;
  // Array size ref stores a list of random num for div sizing and callbacks
  const arraySize = React.useRef(
    new Array<number>(childLength).fill(minHeight)
  );
  // totalSize flag drives our callback update
  const [totalSize, setTotalSize] = React.useState(minHeight * childLength);

  React.useEffect(() => {
    let _totalSize = 0;
    for (let i = 0; i < childLength; i++) {
      arraySize.current[i] = Math.random() * 150 + minHeight;
      _totalSize += arraySize.current[i];
    }
    setTotalSize(_totalSize);
  }, []);

  const getItemSizeCallback = React.useCallback(
    (index: number) => {
      return arraySize.current[index];
    },
    [arraySize, totalSize]
  );

  return (
    <VirtualizerScrollViewDynamic
      numItems={childLength}
      itemSize={minHeight}
      getItemSize={getItemSizeCallback}
      container={{
        role: 'list',
        'aria-label': `Virtualized list with ${childLength} children`,
        tabIndex: 0,
        style: { maxHeight: '80vh' },
      }}
      enableScrollLoad={true}
    >
      {(index: number, isScrolling = false) => {
        const backgroundColor = index % 2 ? '#FFFFFF' : '#ABABAB';
        return isScrolling ? (
          <div style={{ minHeight: arraySize.current[index], backgroundColor }}>
            LOADING
          </div>
        ) : (
          <div
            role={'listitem'}
            aria-posinset={index}
            aria-setsize={childLength}
            key={`test-virtualizer-child-${index}`}
            className={styles.child}
            style={{ minHeight: arraySize.current[index], backgroundColor }}
          >{`Node-${index} - size: ${arraySize.current[index]}`}</div>
        );
      }}
    </VirtualizerScrollViewDynamic>
  );
};
