import * as React from 'react';
import { WindowRegular } from '@fluentui/react-icons';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { useStyles } from './styles';

export const Brand = () => {
  const styles = useStyles();

  return (
    <div className={styles.pane}>
      <Header brandIcon={<WindowRegular fontSize={20} />} caption="Copilot" />
    </div>
  );
};

Brand.parameters = {
  docs: {
    source: {
      type: 'code',
    },
    description: {
      story: `If the pane feature is not native to Teams it will require a brand
        identifier`,
    },
  },
};
