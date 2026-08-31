import * as React from 'react';
import { Checkbox, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Mixed" checked="mixed" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Circular" shape="circular" />
      <Checkbox label="Large" size="large" />
    </div>
  );
};
