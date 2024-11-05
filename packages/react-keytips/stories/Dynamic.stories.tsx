import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';
import { makeStyles, Button } from '@fluentui/react-components';
import description from './Dynamic.md';

const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});

export const DynamicStory = () => {
  const classes = useStyles();

  const [currentButton, setCurrentButton] = React.useState('Button 1');
  const startSequence = currentButton === 'Button 1' ? 'gg1' : 'gg2';

  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement?.click();
  };

  const firstButton = useKeytipRef({
    keySequences: ['gg1'],
    content: 'GG1',
    dynamic: true,
    onExecute,
  });

  const secondButton = useKeytipRef({
    keySequences: ['gg2'],
    content: 'GG2',
    dynamic: true,
    onExecute,
  });

  const thirdButton = useKeytipRef({
    content: 'GG3',
    keySequences: [startSequence, 'gg3'],
  });

  return (
    <>
      <div className={classes.column}>
        <div className={classes.row}>
          <Button
            ref={firstButton}
            onClick={() => {
              setCurrentButton('Button 1');
            }}
          >
            Button 1
          </Button>
          <Button
            ref={secondButton}
            onClick={() => {
              setCurrentButton('Button 2');
            }}
          >
            Button 2
          </Button>
        </div>
        <Button ref={thirdButton}>
          Button 3, active button is {currentButton}
        </Button>
      </div>
    </>
  );
};

DynamicStory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
