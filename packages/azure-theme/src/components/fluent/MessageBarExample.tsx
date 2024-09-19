import * as React from 'react';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  Link,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});
const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const MessageBarExample = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      {intents.map((intent) => (
        <MessageBar key={intent} intent={intent}>
          <MessageBarBody>
            <MessageBarTitle>Intent {intent}</MessageBarTitle>
            Message providing information to the user with actionable insights.{' '}
            <Link>Link</Link>
          </MessageBarBody>
        </MessageBar>
      ))}
    </div>
  );
};
