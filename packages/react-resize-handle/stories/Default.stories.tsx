import * as React from 'react';
import type { StoryObj } from '@storybook/react';
import { useResizeHandle } from '@fluentui-contrib/react-resize-handle';
import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  useMergedRefs,
  Radio,
  RadioGroup,
  tokens,
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
    gridArea: 'nav',
  },
  areaSubNav: {
    gridArea: 'sub-nav',
  },
  areaMain: {
    gridArea: 'main',
  },
  areaMainFooter: {
    gridArea: 'main-footer',
  },
  areaSide: {
    gridArea: 'side',
  },
  unitSelector: {
    background: tokens.colorNeutralBackground1,
    position: 'fixed',
    top: '10%',
    left: '50%',
    zIndex: 1,
  },
});

const useMainBoxStyles = makeResetStyles({
  backgroundColor: 'lightgray',
  position: 'relative',
});

type ComponentProps = {
  onDragStart: (value: number, eventType: string) => void;
  onDragEnd: (value: number, eventType: string) => void;
  onChange: (value: number, eventType: string) => void;
};

const Component = (props: ComponentProps) => {
  const pageStyles = usePageStyles();
  const wrapperStyles = useMainWrapperStyles();
  const boxStyles = useMainBoxStyles();
  const styles = useStyles();

  const [unit, setUnit] = React.useState<'px' | 'viewport'>('px');

  const {
    handleRef: navHandleRef,
    wrapperRef: navWrapperRef,
    elementRef: navElementRef,
    setValue: setNavValue,
  } = useResizeHandle({
    variableName: NAV_SIZE_CSS_VAR,
    growDirection: 'end',
    relative: true,
    onChange: (_, { value, type }) => {
      props.onChange(value, String(type));
    },
    onDragStart: (_, { value, type }) => {
      props.onDragStart(value, String(type));
    },
    onDragEnd: (_, { value, type }) => {
      props.onDragEnd(value, String(type));
    },
    unit,
  });

  const {
    handleRef: sideHandleRef,
    wrapperRef: sideWrapperRef,
    elementRef: sideElementRef,
  } = useResizeHandle({
    variableName: SIDE_SIZE_CSS_VAR,
    growDirection: 'start',
    unit,
  });

  const {
    handleRef: footerHandleRef,
    wrapperRef: footerWrapperRef,
    elementRef: footerElementRef,
  } = useResizeHandle({
    variableName: FOOTER_SIZE_CSS_VAR,
    growDirection: 'up',
    unit,
  });

  const wrapperRef = useMergedRefs(
    navWrapperRef,
    sideWrapperRef,
    footerWrapperRef
  );

  const resetToInitial = () => {
    setNavValue(0);
  };

  return (
    <div className={pageStyles}>
      <div className={styles.unitSelector}>
        <RadioGroup
          layout="horizontal"
          onChange={(_, data) => {
            setUnit(data.value as 'px' | 'viewport');
          }}
          value={unit}
        >
          <Radio value="px" label="px" />
          <Radio value="viewport" label="viewport" />
        </RadioGroup>
      </div>

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

export const Default: StoryObj<ComponentProps> = {
  render: (args) => {
    return <Component {...args} />;
  },
  argTypes: {
    onDragStart: { action: 'Dragging started' },
    onDragEnd: { action: 'Dragging ended' },
    onChange: { action: 'Changed' },
  },
};
