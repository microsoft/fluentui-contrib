import * as React from 'react';
import {
  Button,
  FluentProvider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import { TEAMS_STYLE_HOOKS } from '../../src/teams/index';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: tokens.spacingHorizontalXXXL,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  label: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
});

const ButtonSet = () => {
  const styles = useStyles();
  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div className={styles.row}>
        <Button size="small" appearance="primary">
          Small
        </Button>
        <Button size="medium" appearance="primary">
          Medium
        </Button>
        <Button size="large" appearance="primary">
          Large
        </Button>
      </div>
      <div className={styles.row}>
        <Button size="small" icon={<CalendarIcon />}>
          Small
        </Button>
        <Button size="medium" icon={<CalendarIcon />}>
          Medium
        </Button>
        <Button size="large" icon={<CalendarIcon />}>
          Large
        </Button>
      </div>
      <div className={styles.row}>
        <Button size="small" icon={<CalendarIcon />} title="Icon only" />
        <Button size="medium" icon={<CalendarIcon />} title="Icon only" />
        <Button size="large" icon={<CalendarIcon />} title="Icon only" />
      </div>
    </div>
  );
};

export const CAPvsTeams = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.label}>CAP Theme</div>
        <ButtonSet />
      </div>
      <div>
        <div className={styles.label}>Teams</div>
        <FluentProvider customStyleHooks_unstable={TEAMS_STYLE_HOOKS}>
          <ButtonSet />
        </FluentProvider>
      </div>
    </div>
  );
};
