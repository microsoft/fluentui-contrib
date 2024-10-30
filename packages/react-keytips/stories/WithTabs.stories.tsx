import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';
import {
  makeStyles,
  Tab,
  TabList,
  Button,
  Checkbox,
  Switch,
  Text,
  Link,
} from '@fluentui/react-components';
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  panels: {
    padding: '10px',
  },
  row: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
});

const btnExecute: ExecuteKeytipEventHandler = (_, el) => {
  el.targetElement?.click();
};

export const WithTabsStory = () => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('1');

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const refFirstTab = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    onExecute: btnExecute,
  });

  const refSecondTab = useKeytipRef({
    keySequences: ['b'],
    content: 'B',
    onExecute: btnExecute,
  });

  const refThirdTab = useKeytipRef({
    keySequences: ['c'],
    content: 'C',
    onExecute: btnExecute,
  });

  const checkBoxRef = useKeytipRef<HTMLInputElement>({
    keySequences: ['a', '1'],
    content: '1',
    onExecute: btnExecute,
  });

  const switchRef = useKeytipRef<HTMLInputElement>({
    keySequences: ['a', '2'],
    content: '2',
    onExecute: btnExecute,
  });

  const linkRef = useKeytipRef<HTMLAnchorElement | HTMLSpanElement>({
    keySequences: ['a', '3'],
    content: '3',
    onExecute: btnExecute,
  });

  const btnRef = useKeytipRef({
    keySequences: ['b', '1'],
    content: 'B1',
    onExecute: btnExecute,
  });

  const btnRefSecond = useKeytipRef({
    keySequences: ['c', '1'],
    content: 'C1',
    onExecute: btnExecute,
  });

  return (
    <>
      <TabList onTabSelect={onTabSelect}>
        <Tab id="1" ref={refFirstTab} value="1">
          First Tab
        </Tab>
        <Tab id="2" ref={refSecondTab} value="2">
          Second Tab
        </Tab>
        <Tab id="3" ref={refThirdTab} value="3">
          Third Tab
        </Tab>
      </TabList>
      <div className={classes.panels}>
        {selectedValue === '1' && (
          <div role="tabpanel" className={classes.row}>
            <Checkbox ref={checkBoxRef} label="Checkbox" />
            <Switch ref={switchRef} label="This is a switch" />
            <Text>
              Go to{' '}
              <Link href="https://bing.com" ref={linkRef} target="_blank">
                Bing
              </Link>
            </Text>
          </div>
        )}
        {selectedValue === '2' && (
          <div role="tabpanel">
            <Button ref={btnRef}>Button 2</Button>
          </div>
        )}
        {selectedValue === '3' && (
          <div role="tabpanel">
            <Button ref={btnRefSecond}>Button 3</Button>
          </div>
        )}
      </div>
    </>
  );
};
