import * as React from 'react';
import {
  makeStyles,
  tokens,
  useId,
  Label,
  SpinButton,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Default = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <div className={styles.base}>
      <Label htmlFor={id}>Default SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={id} />
    </div>
  );
};
