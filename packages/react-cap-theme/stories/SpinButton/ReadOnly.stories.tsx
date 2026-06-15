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

export const ReadOnly = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <div className={styles.base}>
      <Label htmlFor={id}>Read-only</Label>
      <SpinButton readOnly id={id} />
    </div>
  );
};
