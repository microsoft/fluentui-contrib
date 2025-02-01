import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';
import { tokens, makeStyles, Tab, TabList } from '@fluentui/react-components';
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from '@fluentui/react-components';
import Home from './Home';
import View from './View';
import Help from './Help';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground6,
  },
  panels: {
    padding: '10px',
  },
  panel: {
    boxSizing: 'border-box',
    maxWidth: '800px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  row: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
});

const onExecute: ExecuteKeytipEventHandler = (_, el) => {
  el.targetElement?.click();
};

export const OverflowStory = () => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Home');

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const homeButtonKeytipRef = useKeytipRef({
    keySequences: ['h'],
    content: 'H',
    dynamic: true,
    onExecute,
  });

  const valueButtonKeytipRef = useKeytipRef({
    keySequences: ['v'],
    content: 'V',
    dynamic: true,
    onExecute,
  });

  const helpButtonKeytipRef = useKeytipRef({
    keySequences: ['e'],
    content: 'E',
    dynamic: true,
    onExecute,
  });

  return (
    <div className={classes.root}>
      <TabList onTabSelect={onTabSelect}>
        <Tab id="Home" ref={homeButtonKeytipRef} value="Home">
          Home
        </Tab>
        <Tab id="View" ref={valueButtonKeytipRef} value="View">
          View
        </Tab>
        <Tab id="Help" ref={helpButtonKeytipRef} value="Help">
          Help
        </Tab>
      </TabList>
      <div className={classes.panels}>
        {selectedValue === 'Home' && (
          <div className={classes.panel} role="tabpanel">
            <Home />
          </div>
        )}
        {selectedValue === 'View' && (
          <div className={classes.panel} role="tabpanel">
            <View />
          </div>
        )}
        {selectedValue === 'Help' && (
          <div className={classes.panel} role="tabpanel">
            <Help />
          </div>
        )}
      </div>
    </div>
  );
};
