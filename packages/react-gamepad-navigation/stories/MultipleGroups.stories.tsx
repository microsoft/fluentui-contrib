import * as React from 'react';
import { Default } from './Default.stories';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});
export const MultipleGroups = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Default></Default>
      <Default></Default>
      <Default></Default>
    </div>
  );
};
