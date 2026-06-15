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

export const Error = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <div className={styles.base}>
      <Label htmlFor={id}>Error</Label>
      <SpinButton aria-invalid defaultValue={10} id={id} />
    </div>
  );
};
