/* eslint-disable no-restricted-globals */
import * as React from 'react';
import {
  Virtualizer,
  useDynamicVirtualizerMeasure,
  VirtualizerContextProvider,
} from '@fluentui/react-virtualizer';
import type { DynamicVirtualizerContextProps } from '@fluentui/react-virtualizer';
import { makeStyles } from '@fluentui/react-components';

const smallSize = 100;
const largeSize = 200;
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
    gap: '20px',
  },
  child: {
    height: `${smallSize}px`,
    lineHeight: `${smallSize}px`,
    width: '100%',
    backgroundColor: '#BBBBBB',
  },
  childLarge: {
    height: `${largeSize}px`,
    lineHeight: `${largeSize}px`,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
});

export const Dynamic = () => {
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const childProgressiveSizes = React.useRef<number[]>([]);
  const [flag, toggleFlag] = React.useState(false);
  const styles = useStyles();
  const childLength = 1000;
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    updateTimeout();
  }, []);

  const updateTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      toggleFlag((iFlag) => !iFlag);
      updateTimeout();
    }, 2000);
  };

  const getSizeForIndex = React.useCallback(
    (index: number): number => {
      const sizeValue1 = flag ? largeSize : smallSize;
      const sizeValue2 = flag ? smallSize : largeSize;

      const sizeValue = index % 2 === 0 ? sizeValue1 : sizeValue2;
      return sizeValue;
    },
    [flag]
  );

  const contextState: DynamicVirtualizerContextProps = {
    contextIndex: currentIndex,
    setContextIndex: setCurrentIndex,
    childProgressiveSizes,
  };

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
    updateScrollPosition,
  } = useDynamicVirtualizerMeasure({
    defaultItemSize: 100,
    getItemSize: getSizeForIndex,
    numItems: childLength,
    virtualizerContext: contextState,
  });

  return (
    <VirtualizerContextProvider value={contextState}>
      <div
        aria-label="Dynamic Virtualizer Example"
        className={styles.container}
        role={'list'}
        ref={scrollRef}
      >
        <Virtualizer
          getItemSize={getSizeForIndex}
          numItems={childLength}
          bufferSize={bufferSize}
          bufferItems={bufferItems}
          virtualizerLength={virtualizerLength}
          itemSize={100}
          containerSizeRef={containerSizeRef}
          virtualizerContext={contextState}
          updateScrollPosition={updateScrollPosition}
          gap={20}
        >
          {React.useCallback(
            (index: number) => {
              const sizeValue = getSizeForIndex(index);
              const sizeClass =
                sizeValue === smallSize ? styles.child : styles.childLarge;
              return (
                <div
                  className={sizeClass}
                  role={'listItem'}
                  aria-posinset={index}
                  aria-setsize={childLength}
                  key={`child-node-${index}-${sizeValue}`}
                >{`Node-${index}-size-${sizeValue}`}</div>
              );
            },
            [getSizeForIndex, styles.child, styles.childLarge]
          )}
        </Virtualizer>
      </div>
    </VirtualizerContextProvider>
  );
};
