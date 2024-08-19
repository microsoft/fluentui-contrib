import * as React from 'react';
import {
  Keytips,
  KeytipsProps,
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';
import { makeStyles, Button } from '@fluentui/react-components';

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

export const Dynamic = (props: KeytipsProps) => {
  const classes = useStyles();

  const [currentButton, setCurrentButton] = React.useState('Button 1');
  const [startSequence, setStartSequence] = React.useState('gg1');

  React.useEffect(() => {
    setStartSequence(currentButton === 'Button 1' ? 'gg1' : 'gg2');
  }, [currentButton]);

  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement?.click();
  };

  const firstButton = useKeytipRef({
    uniqueId: '1',
    keySequences: ['gg1'],
    content: 'GG1',
    hasDynamicChildren: true,
    onExecute,
  });

  const secondButton = useKeytipRef({
    uniqueId: '2',
    keySequences: ['gg2'],
    content: 'GG2',
    hasDynamicChildren: true,
    onExecute,
  });

  const thirdButton = useKeytipRef({
    uniqueId: '3',
    keySequences: [startSequence, 'gg3'],
    content: 'GG3',
    onExecute,
  });

  return (
    <>
      <Keytips {...props} />
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
  props;
};
