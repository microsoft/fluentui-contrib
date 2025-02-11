import * as React from 'react';
import { Button } from '@fluentui-contrib/teams-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

const useStyles = makeStyles({
  sampleContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 120px)',
    gap: tokens.spacingHorizontalL,
  },

  evil: {
    background: 'red',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.sampleContainer}>
      <Button>Button</Button>
      <Button icon={{ children: <CalendarIcon /> }}>Button</Button>
      <Button icon={<CalendarIcon />} tooltip="Calendar" />

      <Button appearance="transparent">Button</Button>
      <Button appearance="transparent" icon={<CalendarIcon />}>
        Button
      </Button>
      <Button
        appearance="transparent"
        icon={<CalendarIcon />}
        tooltip="Calendar"
      />

      <Button appearance="primary">Button</Button>
      <Button appearance="primary" icon={<CalendarIcon />}>
        Button
      </Button>
      <Button appearance="primary" icon={<CalendarIcon />} tooltip="Calendar" />
    </div>
  );
};
