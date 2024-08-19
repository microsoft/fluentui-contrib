import * as React from 'react';
import { Button, makeStyles, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';
import {
  DismissRegular,
  DismissFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  interactiveTab: {
    paddingInlineEnd: '30px',
  },
  dismissButton: {
    position: 'absolute',
    right: '5px',
    top: '10px',
  },
});

const tabs = [
  { value: 'tab1', content: 'First Tab' },
  { value: 'tab2', content: 'Second Tab' },
  { value: 'tab3', content: 'Third Tab' },
  { value: 'tab4', content: 'Fourth Tab' },
];

export const Default = (props: Partial<TabListProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList selectTabOnFocus {...props}>
        {tabs.map((tab) => (
          <InteractiveTab
            key={tab.value}
            button={{ className: styles.interactiveTab }}
            value={tab.value}
            contentAfter={
              <Button
                appearance="subtle"
                className={styles.dismissButton}
                icon={<DismissIcon />}
                size="small"
                onClick={() => alert('Dismiss button clicked')}
              />
            }
          >
            {tab.content}
          </InteractiveTab>
        ))}
      </TabList>
    </div>
  );
};
