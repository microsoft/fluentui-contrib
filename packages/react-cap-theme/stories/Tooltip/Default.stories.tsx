import * as React from 'react';
import { Button, Tooltip, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
    paddingTop: tokens.spacingVerticalXXXL,
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Tooltip content="Default tooltip" relationship="label">
        <Button>Hover me (default)</Button>
      </Tooltip>
      <Tooltip content="Description tooltip" relationship="description">
        <Button>Hover me (description)</Button>
      </Tooltip>
      <Tooltip content="Inverted tooltip" relationship="label" appearance="inverted">
        <Button>Hover me (inverted)</Button>
      </Tooltip>
    </div>
  );
};
