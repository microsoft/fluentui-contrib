import * as React from 'react';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  Link,
  makeStyles,
  FluentProvider,
} from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // gap: "10px",
  },
});
const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const MessageBarExample = () => {
  const classes = useClasses();

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider theme={AzureLightTheme}>
        <div className={classes.container}>
          {intents.map((intent) => (
            <MessageBar key={intent} intent={intent}>
              <MessageBarBody>
                <MessageBarTitle>Intent {intent}</MessageBarTitle>
                Message providing information to the user with actionable
                insights. <Link>Link</Link>
              </MessageBarBody>
            </MessageBar>
          ))}
        </div>
      </FluentProvider>
      <FluentProvider theme={AzureDarkTheme}>
        <div className={classes.container}>
          {intents.map((intent) => (
            <MessageBar key={intent} intent={intent}>
              <MessageBarBody>
                <MessageBarTitle>Intent {intent}</MessageBarTitle>
                Message providing information to the user with actionable
                insights. <Link>Link</Link>
              </MessageBarBody>
            </MessageBar>
          ))}
        </div>
      </FluentProvider>
    </div>
  );
};
