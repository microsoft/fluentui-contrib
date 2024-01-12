import * as React from 'react';
import { useResizeHandle } from '@fluentui-contrib/react-resize-handle';
import { makeResetStyles, useMergedRefs } from '@fluentui/react-components';

const NAV_INITIAL_WIDTH = 80;
const SIDE_INITIAL_WIDTH = 70;

const Handle = React.forwardRef<
  HTMLDivElement,
  { position: 'left' | 'right'; onDoubleClick?: () => void }
>((props, ref) => {
  const { position, ...rest } = props;

  const handleClick: React.MouseEventHandler = React.useCallback((event) => {
    if (event.detail === 2) {
      props.onDoubleClick?.();
    }
  }, []);

  return (
    <div
      {...rest}
      ref={ref}
      onClick={handleClick}
      style={{
        position: 'absolute',
        ...(position === 'right' ? { right: '-12px' } : { left: '-12px' }),
        top: '50%',
        transform: 'translateY(-50%)',
        width: '8px',
        height: '100px',
        borderRadius: '4px',
        backgroundColor: 'gray',
        cursor: 'ew-resize',
      }}
    />
  );
});

const usePageStyles = makeResetStyles({
  height: '100vh',
});

const useMainWrapperStyles = makeResetStyles({
  display: 'grid',
  width: '100%',
  height: '100%',
  gap: '16px',
  gridTemplate:
    '"nav sub-nav main side" minmax(0, 1fr) / clamp(30px, var(--nav-size), 40%)  150px 1fr var(--side-size)',
});

const useMainBoxStyles = makeResetStyles({
  // borderRadius: '8px',
  backgroundColor: 'lightgray',
  position: 'relative',
});

type ComponentProps = {
  maxWidth: number;
  onDragStart: (value: number) => void;
  onDragEnd: (value: number) => void;
  onChange: (value: number) => void;
};

const Component = (props: ComponentProps) => {
  const pageStyles = usePageStyles();
  const wrapperStyles = useMainWrapperStyles();
  const boxStyles = useMainBoxStyles();

  const [maxValue, setMaxValue] = React.useState(400);

  const {
    handleRef: navHandleRef,
    wrapperRef: navWrapperRef,
    elementRef: navElementRef,
    setValue: setLeftColumnSize,
  } = useResizeHandle({
    variableName: '--nav-size',
    growDirection: 'right',
    initialValue: NAV_INITIAL_WIDTH,
    minValue: 60,
    maxValue: maxValue,
    onChange: (value: number) => {
      props.onChange(value);
    },
    onDragStart: (e, value: number) => {
      props.onDragStart(value);
    },
    onDragEnd: (e, value: number) => {
      props.onDragEnd(value);
    },
  });

  const {
    handleRef: sideHandleRef,
    wrapperRef: sideWrapperRef,
    elementRef: sideElementRef,
  } = useResizeHandle({
    variableName: '--side-size',
    growDirection: 'left',
    initialValue: SIDE_INITIAL_WIDTH,
    minValue: 30,
    maxValue: 200,
  });

  const wrapperRef = useMergedRefs(navWrapperRef, sideWrapperRef);

  const resetToInitial = () => {
    setLeftColumnSize(NAV_INITIAL_WIDTH);
  };

  return (
    <div className={pageStyles}>
      <div className={wrapperStyles} ref={wrapperRef}>
        <div
          className={boxStyles}
          style={{ gridArea: 'nav' }}
          ref={navElementRef}
        >
          <button onClick={() => setMaxValue(200)}>Set max 200</button>
          <Handle
            position="right"
            ref={navHandleRef}
            onDoubleClick={resetToInitial}
          />
        </div>
        <div className={boxStyles} style={{ gridArea: 'sub-nav' }} />
        <div className={boxStyles} style={{ gridArea: 'main' }} />
        <div
          className={boxStyles}
          style={{ gridArea: 'side' }}
          ref={sideElementRef}
        >
          <Handle position="left" ref={sideHandleRef} />
        </div>
      </div>
    </div>
  );
};

export const Default = {
  render: (args) => {
    console.log('args', args);
    return <Component {...args} />;
  },
  argTypes: {
    onDragStart: { action: 'Dragging started' },
    onDragEnd: { action: 'Dragging ended' },
    onChange: { action: 'Changed' },
  },
};
