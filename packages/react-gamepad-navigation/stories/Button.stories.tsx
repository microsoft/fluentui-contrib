import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';
import { userGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
  row: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const TextButtons = () => {
  const styles = useStyles();
  const attributes = userGamepadNavigationGroup();

  return (
    <div className={styles.container} {...attributes}>
      <div className={styles.row}>
        <Button>Default</Button>
        <Button appearance="primary">Primary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
      </div>
      <br />
      <div className={styles.row}>
        <Button>Default</Button>
        <Button appearance="primary">Primary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
      </div>
    </div>
  );
};
