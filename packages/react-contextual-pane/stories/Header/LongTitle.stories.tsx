import * as React from 'react';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { useStyles } from './styles';

export const LongTitle = () => {
  const styles = useStyles();

  return (
    <div className={styles.pane}>
      <Header caption="This is a very very long long long title" />
    </div>
  );
};

LongTitle.parameters = {
  docs: {
    source: {
      type: 'code',
    },
    description: {
      story: `When a very long title is passed it will be truncated and we have a
        tooltip present for it`,
    },
  },
};
