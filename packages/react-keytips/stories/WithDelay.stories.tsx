import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';

const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) targetElement.click();
};

export const DefaultStory = () => {
  const normalButton = useKeytipRef({
    keySequences: ['b1'],
    content: 'B1',
    onExecute,
  });

  return <Button ref={normalButton}>Delayed Start of Keytip Mode</Button>;
};

DefaultStory.parameters = {
  docs: {
    description: {
      story: [
        `By default Keytips are shown for all target elements that have keytip attached via
\`useKeytipRef\`, except disabled elements.`,
        `When multiple Keytips start with the same character, typing that character will filter the visible keytips.`,
      ].join('\n'),
    },
  },
};
