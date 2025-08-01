import * as React from 'react';
import {
  Virtualizer,
  useStaticVirtualizerMeasure,
} from '@fluentui/react-virtualizer';
import { makeStyles } from '@fluentui/react-components';

import { useFluent } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    /*
     * This is an 'unbounded' example intended to show virtualization in Body doc scroll
     * However, we need a sensible height limit
     * this would be enforced by a browser window,
     * but iFrames can break this if not capped.
     */
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300VH',
    width: '100%',
    height: '100%',
  },
  child: {
    display: 'flex',
    lineHeight: '100px',
    width: '100%',
  },
  block: {
    width: '100%',
    paddingTop: '100px',
    paddingBottom: '100px',
    fontSize: '36px',
    textAlign: 'center',
    minHeight: '100px',
  },
});

export const DefaultUnbounded = () => {
  const styles = useStyles();
  const childLength = 1000;
  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
  } = useStaticVirtualizerMeasure({
    defaultItemSize: 100,
  });

  const { targetDocument } = useFluent();
  if (targetDocument) {
    scrollRef(targetDocument.body);
  }

  return (
    <div
      aria-label="Virtualizer Example"
      className={styles.container}
      role={'list'}
    >
      <div
        key={`virtualizer-header`}
        className={styles.block}
      >{`Virtualizer`}</div>
      <Virtualizer
        numItems={childLength}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={100}
        containerSizeRef={containerSizeRef}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {(index, _isScrolling) => {
          return (
            <span
              role={'listitem'}
              aria-posinset={index}
              aria-setsize={childLength}
              key={`test-virtualizer-child-${index}`}
              className={styles.child}
            >{`Node-${index}`}</span>
          );
        }}
      </Virtualizer>
      <div key={`virtualizer-footer`} className={styles.block}>
        Footer
      </div>
    </div>
  );
};
