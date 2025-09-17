/** @jsxRuntime classic */
/** @jsx createElement */
/** @jsxFrag Fragment */
/* eslint-disable no-restricted-globals */
import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import {
  VirtualizerScrollViewDynamic,
  ScrollToInterface,
  VirtualizerDataRef,
} from '@fluentui-contrib/react-virtualizer';
import {
  Text,
  Button,
  Input,
  makeStyles,
  Switch,
  useMergedRefs,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    maxHeight: '80vh',
    border: '2px solid red',
    backgroundColor: '#f5f5f5',
  },
  child: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  lazyImage: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    display: 'block',
    borderRadius: '4px',
    marginTop: '8px',
  },
  asyncContent: {
    backgroundColor: '#f0f8ff',
    padding: '12px',
    borderRadius: '4px',
    marginTop: '8px',
    border: '1px dashed #4a90e2',
  },
});

const baseHeight = 90;

// Component that simulates real async loading with actual DOM size changes
const LazyLoadingComponent = React.forwardRef(
  ({ index }: { index: number }, ref) => {
    const styles = useStyles();
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [contentLoaded, setContentLoaded] = React.useState(false);
    const [massiveContentLoaded, setMassiveContentLoaded] =
      React.useState(false);

    React.useEffect(() => {
      console.log(
        `LazyLoadingComponent ${index} mounting, starting phase progression`
      );

      // Let's set the image to loaded immediatly to stress-test an immediate size update
      // Phase 1: "Image" loads - longer delay to allow scrolling during loading
      const timer1 = setTimeout(() => {
        console.log(
          `LazyLoadingComponent ${index} entering phase 1 - image loading`
        );
        setImageLoaded(true);
      }, 2000 + (index % 3) * 500); // 2-3.5 seconds

      // Phase 2: "Content" loads - even longer delay
      const timer2 = setTimeout(() => {
        console.log(
          `LazyLoadingComponent ${index} entering phase 2 - content loading`
        );
        setContentLoaded(true);
      }, 4000 + (index % 4) * 800); // 4-7.2 seconds

      // Phase 3: "Massive content" loads - very long delay to ensure user is scrolling
      const timer3 = setTimeout(() => {
        console.log(
          `LazyLoadingComponent ${index} entering phase 3 - MASSIVE CONTENT loading`
        );
        setMassiveContentLoaded(true);
      }, 6000 + (index % 5) * 1000); // 6-10 seconds

      return () => {
        console.log(
          `LazyLoadingComponent ${index} unmounting, clearing timers and resetting state`
        );
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }, []); // Empty dependency array ensures this runs on every mount, not just when index changes

    // Calculate actual heights that change dramatically over time
    const imageHeight = imageLoaded ? 100 + (index % 3) * 50 : 0; // 0 → 100-200px
    const contentHeight = contentLoaded ? 200 + (index % 4) * 100 : 0; // 0 → 200-500px

    // MASSIVE content that will cause huge jumps
    const massiveHeight = massiveContentLoaded ? 800 + (index % 6) * 200 : 0; // 0 → 800-1800px

    const totalHeight =
      baseHeight + imageHeight + contentHeight + massiveHeight;
    // Final range: 60px → 1160px to 2560px

    // Typecast ref via useMergedRefs
    const _ref = useMergedRefs(ref);
    return (
      <div
        ref={_ref}
        id={`virtualizer-item-${index}`}
        key={`virtualizer-item-${index}`}
        className={styles.child}
        style={{
          boxSizing: 'border-box', // If you want border/padding etc. on the outside div, use border-box
          minHeight: totalHeight, // This will jump from ~60px to ~2000px+
          transition: 'min-height 0.2s ease', // Faster transition to see jumps
          border: `2px solid ${massiveContentLoaded ? '#ff4444' : '#ddd'}`, // Visual indicator
        }}
      >
        <div
          style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}
        >
          Item {index} (Height: {totalHeight}px)
          {massiveContentLoaded && ' 🚨 MASSIVE!'}
        </div>

        <div style={{ padding: '4px', backgroundColor: '#f9f9f9' }}>
          Base content - always here (60px)
        </div>

        {imageLoaded && (
          <div
            className={styles.lazyImage}
            style={{
              height: imageHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '12px',
              backgroundColor: '#e8f4f8',
            }}
          >
            📸 Image Section ({imageHeight}px)
          </div>
        )}

        {contentLoaded && (
          <div
            className={styles.asyncContent}
            style={{
              height: contentHeight,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: '12px',
              backgroundColor: '#f0f8e8',
            }}
          >
            <div>📝 Content Section ({contentHeight}px)</div>
            <div>This is regular async content</div>
          </div>
        )}

        {massiveContentLoaded && (
          <div
            style={{
              height: massiveHeight,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              fontSize: '14px',
              backgroundColor: '#ffe8e8',
              border: '2px dashed #ff6666',
              padding: '20px',
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#cc0000' }}>
              🚨 MASSIVE CONTENT LOADED ({massiveHeight}px)
            </div>
            <div>This content is HUGE!</div>
            <div>Height range: 800px - 1800px per item</div>
            <div>This simulates:</div>
            <ul style={{ textAlign: 'left' }}>
              <li>Large images loading</li>
              <li>Video players appearing</li>
              <li>Expanded comments sections</li>
              <li>Dynamic forms</li>
              <li>Lazy-loaded galleries</li>
            </ul>
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
              When this loads, the virtualizer's sizing changes significantly!
            </div>

            {/* Add some filler content to reach the massive height */}
            {Array.from({ length: Math.floor(massiveHeight / 100) }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: '#fff',
                }}
              >
                Filler content block {i + 1} for item {index}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            padding: '8px',
            backgroundColor: '#f0f0f0',
            fontSize: '11px',
            borderTop: '1px solid #ccc',
          }}
        >
          Loading phases: Base({baseHeight}) + Image({imageHeight}) + Content(
          {contentHeight}) + Massive({massiveHeight}) = {totalHeight}px
        </div>
      </div>
    );
  }
);

export const ComplexDynamicList = () => {
  const styles = useStyles();
  const childLength = 100;
  const [goToIndex, setGoToIndex] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const virtualizerScrollRef = React.useRef<HTMLDivElement & ScrollToInterface>(
    null
  );
  const virtualizerRef = React.useRef<VirtualizerDataRef>(null);

  const scrollToIndex = () => {
    const sizeTrackingArray =
      virtualizerScrollRef.current?.sizeTrackingArray?.current;
    const renderSizeTrackingArray = virtualizerRef.current?.nodeSizes?.current;
    const progressiveSizeArray =
      virtualizerRef.current?.progressiveSizes?.current;
    if (
      !sizeTrackingArray ||
      !renderSizeTrackingArray ||
      !progressiveSizeArray
    ) {
      // No virtualizer sizes, error (shouldn't happen);
      return;
    }

    const updateSizing = () => {
      // Update all internal virtualizer size tracking so that it accounts for post-render changes
      for (let i = 0; i < childLength; i++) {
        renderSizeTrackingArray[i] = sizeTrackingArray[i];
        if (i > 0) {
          progressiveSizeArray[i] =
            progressiveSizeArray[i - 1] + sizeTrackingArray[i];
        } else {
          progressiveSizeArray[0] = sizeTrackingArray[0];
        }
      }
    };

    updateSizing();
    setMessage(`Going to index: ${goToIndex}`);
    const bleedInForAnchor = 2;
    virtualizerScrollRef.current?.scrollToPosition(
      progressiveSizeArray[goToIndex - 1] + bleedInForAnchor,
      'instant', // Smooth would create more size changes while scrolling
      goToIndex,
      (index: number) => {
        // The newly rendered items may have shifted due to dynamic sizes
        // do a double scroll to be sure we get the right position
        updateSizing();
        virtualizerScrollRef.current?.scrollToPosition(
          progressiveSizeArray[goToIndex - 1] + bleedInForAnchor,
          'instant', // Smooth would create more size changes while scrolling
          goToIndex,
          (index: number) => {
            setMessage(`Reached index: ${goToIndex}`);
          }
        );
      }
    );
  };

  const onChangeGoToIndex = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>
  ) => {
    const indexValue = ev ? (ev.currentTarget as HTMLInputElement).value : '';
    const newIndex = Math.min(
      Math.max(parseInt(indexValue, 10), 0),
      childLength - 1
    );
    setGoToIndex(newIndex);
  };

  return (
    <div>
      <div
        style={{
          boxSizing: 'border-box',
          margin: '0 0 20px 0',
          padding: '16px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0' }}>
          Complex dynamic list test - MASSIVE Content
        </h3>
        <p style={{ margin: '0 0 8px 0' }}>
          Items will grow from ~60px to <strong>up to 2500px</strong> in 3
          phases over 6-10 seconds:
        </p>
        <ul style={{ margin: '0 0 8px 0', paddingLeft: '20px' }}>
          <li>
            <strong>Phase 1 (2.0-3.5s):</strong> Image loads (+100-200px)
          </li>
          <li>
            <strong>Phase 2 (4.0-7.2s):</strong> Content loads (+200-500px)
          </li>
          <li>
            <strong>Phase 3 (6.0-10.0s):</strong> 🚨 MASSIVE content loads
            (+800-1800px)
          </li>
        </ul>
        <p
          style={{
            margin: '8px 0 0 0',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#cc0000',
          }}
        >
          ⚠️ Scroll while items are loading! When massive content loads during
          scrolling there will be some scroll jumping due to 'overflowAnchor'
          only partially handling - In order to handle this more gracefully,
          applications should 'scrollBy' any previous-index inline size changes
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
          Auto-measurement enabled - NO getItemSize prop provided.
        </p>
        <div>
          <Input defaultValue={'0'} onChange={onChangeGoToIndex} />
          <Button onClick={scrollToIndex}>{'GoTo'}</Button>
          <Text aria-live="polite">{message}</Text>
        </div>
      </div>

      <VirtualizerScrollViewDynamic
        numItems={childLength}
        itemSize={baseHeight + 2} // Current base size on render + border
        imperativeRef={virtualizerScrollRef}
        imperativeVirtualizerRef={virtualizerRef}
        container={{
          role: 'list',
          className: styles.container,
          style: {
            maxHeight: '80vh',
            // Overflow anchor does an ok job of handling jumps
            // For complete smoothness, applications will
            // need to handle their dynamic sizes with 'scrollBy'
            overflowAnchor: 'auto',
          },
        }}
        bufferItems={1}
        bufferSize={30}
        // NO getItemSize prop = auto-measurement enabled!
      >
        {(index: number) => (
          <LazyLoadingComponent key={`item-${index}`} index={index} />
        )}
      </VirtualizerScrollViewDynamic>
    </div>
  );
};

ComplexDynamicList.storyName = 'Infinite Scroll Bug - Auto Measurement';
