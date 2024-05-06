import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
} from '@fluentui/react-icons';
import {
  Spinner,
  tokens,
  shorthands,
  buttonClassNames,
} from '@fluentui/react-components';
import { CheckmarkFilled } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    rowGap: '15px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke1
    ),
    color: tokens.colorNeutralForeground1,
    cursor: 'default',
    pointerEvents: 'none',

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
  },
});

type LoadingState = 'initial' | 'loading' | 'loaded';

export const ButtonsExample = () => {
  const styles = useStyles();

  const [loadingState, setLoadingState] =
    React.useState<LoadingState>('initial');

  const onButtonClick = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('loaded'), 5000);
  };

  const buttonIcon =
    loadingState === 'loading' ? (
      <Spinner size="tiny" />
    ) : loadingState === 'loaded' ? (
      <CheckmarkFilled />
    ) : null;

  const buttonContent =
    loadingState === 'loading'
      ? 'Loading'
      : loadingState === 'loaded'
      ? 'Loaded'
      : 'Start loading';

  return (
    <div className={styles.wrapper}>
      <Button>Rounded</Button>
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
      <Button icon={<CalendarMonthRegular />}>Default</Button>
      <Button appearance="primary" icon={<CalendarMonthRegular />}>
        Primary
      </Button>
      <Button appearance="outline" icon={<CalendarMonth />}>
        Outline
      </Button>
      <Button appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </Button>
      <Button appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </Button>
      <Button appearance="primary" disabled>
        Disabled state
      </Button>
      <Button appearance="primary" disabledFocusable>
        Disabled focusable state
      </Button>
      <Button
        disabledFocusable={loadingState !== 'initial'}
        icon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};
