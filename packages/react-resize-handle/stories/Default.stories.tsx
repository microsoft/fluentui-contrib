import * as React from 'react';
import { useResizeHandle } from '@fluentui-contrib/react-resize-handle';
import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
  useMergedRefs,
} from '@fluentui/react-components';
import { Handle } from './Handle';

const NAV_SIZE_CSS_VAR = '--nav-size';
const SIDE_SIZE_CSS_VAR = '--side-size';
const FOOTER_SIZE_CSS_VAR = '--footer-size';

const usePageStyles = makeResetStyles({
  height: '100vh',
});

const useMainWrapperStyles = makeResetStyles({
  [NAV_SIZE_CSS_VAR]: '0px',
  [SIDE_SIZE_CSS_VAR]: '120px',
  [FOOTER_SIZE_CSS_VAR]: '10%',
  display: 'grid',
  width: '100%',
  height: '100%',
  gap: '16px',
  gridTemplate: `"nav sub-nav main side" minmax(0, 1fr)
  "nav sub-nav main-footer side" clamp(5%, var(${FOOTER_SIZE_CSS_VAR}), 30%)
  / clamp(60px, calc(20% + var(${NAV_SIZE_CSS_VAR})), 40%)  150px 1fr var(${SIDE_SIZE_CSS_VAR})`,
});

const useStyles = makeStyles({
  areaNav: {
    ...shorthands.gridArea('nav'),
  },
  areaSubNav: {
    ...shorthands.gridArea('sub-nav'),
  },
  areaMain: {
    ...shorthands.gridArea('main'),
  },
  areaMainFooter: {
    ...shorthands.gridArea('main-footer'),
  },
  areaSide: {
    ...shorthands.gridArea('side'),
  },
});

const useMainBoxStyles = makeResetStyles({
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
  const styles = useStyles();

  const {
    handleRef: navHandleRef,
    wrapperRef: navWrapperRef,
    elementRef: navElementRef,
    setValue: setLeftColumnSize,
  } = useResizeHandle({
    variableName: NAV_SIZE_CSS_VAR,
    growDirection: 'end',
    relative: true,
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
    variableName: SIDE_SIZE_CSS_VAR,
    growDirection: 'start',
    minValue: 30,
    maxValue: 200,
  });

  const {
    handleRef: footerHandleRef,
    wrapperRef: footerWrapperRef,
    elementRef: footerElementRef,
  } = useResizeHandle({
    variableName: FOOTER_SIZE_CSS_VAR,
    growDirection: 'up',
  });

  const wrapperRef = useMergedRefs(
    navWrapperRef,
    sideWrapperRef,
    footerWrapperRef
  );

  const resetToInitial = () => {
    setLeftColumnSize(0);
  };

  return (
    <div className={pageStyles}>
      <div className={wrapperStyles} ref={wrapperRef}>
        <div
          className={mergeClasses(boxStyles, styles.areaNav)}
          ref={navElementRef}
        >
          <Handle
            position="end"
            ref={navHandleRef}
            onDoubleClick={resetToInitial}
          />
        </div>
        <div className={mergeClasses(boxStyles, styles.areaSubNav)} />
        <div className={mergeClasses(boxStyles, styles.areaMain)} />
        <div
          className={mergeClasses(boxStyles, styles.areaMainFooter)}
          ref={footerElementRef}
        >
          <Handle position="top" ref={footerHandleRef} />
        </div>
        <div
          className={mergeClasses(boxStyles, styles.areaSide)}
          ref={sideElementRef}
        >
          <Handle position="start" ref={sideHandleRef} />
        </div>
      </div>
    </div>
  );
};

export const Default = {
  render: (args) => {
    return <Component {...args} />;
  },
  argTypes: {
    onDragStart: { action: 'Dragging started' },
    onDragEnd: { action: 'Dragging ended' },
    onChange: { action: 'Changed' },
  },
};
