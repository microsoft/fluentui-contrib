import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Button>Default</Button>
        <Button appearance="primary">Primary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
      </div>
      <div className={styles.row}>
        <Button icon={<CalendarIcon />}>With icon</Button>
        <Button icon={<CalendarIcon />} appearance="primary">
          Primary with icon
        </Button>
        <Button icon={<CalendarIcon />} iconPosition="after">
          Icon after
        </Button>
        <Button icon={<CalendarIcon />} title="Icon only" />
      </div>
      <div className={styles.row}>
        <Button disabled>Disabled</Button>
        <Button disabled appearance="primary">
          Disabled primary
        </Button>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
    </div>
  );
};
