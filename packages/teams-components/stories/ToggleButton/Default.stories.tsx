import * as React from 'react';
import { ToggleButton } from '@fluentui-contrib/teams-components';
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
  const [checked, setChecked] = React.useState<number[]>([]);

  const createOnClick = (value: number) => () => {
    setChecked((prevChecked) => {
      if (prevChecked.find((i) => i === value)) {
        return prevChecked.filter((i) => i !== value);
      } else {
        return [...prevChecked, value];
      }
    });
  };

  const isChecked = (value: number) =>
    checked.find((i) => i === value) !== undefined;

  return (
    <div className={styles.sampleContainer}>
      <ToggleButton onClick={createOnClick(1)} checked={isChecked(1)}>
        Toggle
      </ToggleButton>
      <ToggleButton
        onClick={createOnClick(2)}
        checked={isChecked(2)}
        icon={{ children: <CalendarIcon /> }}
      >
        Toggle
      </ToggleButton>
      <ToggleButton
        onClick={createOnClick(3)}
        checked={isChecked(3)}
        icon={<CalendarIcon />}
        title="Calendar"
      />

      <ToggleButton
        onClick={createOnClick(4)}
        checked={isChecked(4)}
        appearance="transparent"
      >
        Toggle
      </ToggleButton>
      <ToggleButton
        onClick={createOnClick(5)}
        checked={isChecked(5)}
        appearance="transparent"
        icon={<CalendarIcon />}
      >
        Toggle
      </ToggleButton>
      <ToggleButton
        onClick={createOnClick(6)}
        checked={isChecked(6)}
        appearance="transparent"
        icon={<CalendarIcon />}
        title="Calendar"
      />

      <ToggleButton
        checked={isChecked(7)}
        onClick={createOnClick(7)}
        appearance="primary"
      >
        Toggle
      </ToggleButton>
      <ToggleButton
        checked={isChecked(8)}
        onClick={createOnClick(8)}
        appearance="primary"
        icon={<CalendarIcon />}
      >
        Toggle
      </ToggleButton>
      <ToggleButton
        checked={isChecked(9)}
        onClick={createOnClick(9)}
        appearance="primary"
        icon={<CalendarIcon />}
        title="Calendar"
      />
    </div>
  );
};
