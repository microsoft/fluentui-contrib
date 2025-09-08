import * as React from 'react';
import type { StoryObj } from '@storybook/react';
import {
  useResizeHandle,
  type UseResizeHandleParams,
} from '@fluentui-contrib/react-resize-handle';
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
  / clamp(60px, calc(20% + var(${NAV_SIZE_CSS_VAR})), 40%)  150px 1fr clamp(50px, var(${SIDE_SIZE_CSS_VAR}), 200px)`,
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
  onDragStart: (params: { value: string; eventType: string }) => void;
  onDragEnd: (params: { value: string; eventType: string }) => void;
  onChange: (params: { value: string; eventType: string }) => void;
  onChangeRejected: (params: {
    value: string;
    rejectedValue: string;
    eventType: string;
  }) => void;
};

const Component = (props: ComponentProps) => {
  const pageStyles = usePageStyles();
  const wrapperStyles = useMainWrapperStyles();
  const boxStyles = useMainBoxStyles();
  const styles = useStyles();

  const [unit, setUnit] = React.useState<'px' | 'viewport'>('px');

  const handleChange: NonNullable<UseResizeHandleParams['onChange']> =
    React.useCallback(
      (_, { value, type, unit }) => {
        props.onChange({ value: `${value}${unit}`, eventType: String(type) });
      },
      [props.onChange]
    );
  const handleDragStart: NonNullable<UseResizeHandleParams['onDragStart']> =
    React.useCallback(
      (_, { value, type, unit }) => {
        props.onDragStart({
          value: `${value}${unit}`,
          eventType: String(type),
        });
      },
      [props.onDragStart]
    );
  const handleDragEnd: NonNullable<UseResizeHandleParams['onDragEnd']> =
    React.useCallback(
      (_, { value, type, unit }) => {
        props.onDragEnd({
          value: `${value}${unit}`,
          eventType: String(type),
        });
      },
      [props.onDragEnd]
    );
  const handleChangeRejected: NonNullable<
    UseResizeHandleParams['onChangeRejected']
  > = React.useCallback(
    (_, { value, rejectedValue, type, unit }) => {
      props.onChangeRejected({
        value: `${value}${unit}`,
        rejectedValue: `${rejectedValue}${unit}`,
        eventType: String(type),
      });
    },
    [props.onChangeRejected]
  );

  const {
    handleRef: navHandleRef,
    wrapperRef: navWrapperRef,
    elementRef: navElementRef,
    setValue: setNavValue,
  } = useResizeHandle({
    variableName: NAV_SIZE_CSS_VAR,
    growDirection: 'end',
    relative: true,
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

    onChange: handleChange,
    onChangeRejected: handleChangeRejected,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
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
    onDragStart: { action: 'onDragStart()' },
    onDragEnd: { action: 'onDragEnd()' },
    onChange: { action: 'onChange()' },
    onChangeRejected: { action: 'onChangeRejected()' },
  },
};
