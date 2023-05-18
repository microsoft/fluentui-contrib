import { getNativeElementProps, mergeClasses } from '@fluentui/react-components';
import * as React from 'react';

import { useChatClasses } from './Chat.styles';
import { useChatMoverAttribute_unstable } from './useChatMoverAttribute';

export const chatClassName = 'fui-Chat';

export type ChatProps = React.HTMLAttributes<HTMLElement>;

export const Chat = React.forwardRef<HTMLDivElement, ChatProps>((props, ref) => {
  const classes = useChatClasses();
  const className = mergeClasses(chatClassName, classes.base, classes.comfy, props.className);

  const moverAttribute = useChatMoverAttribute_unstable();

  const rootProps = getNativeElementProps('div', {
    ref,
    ...props,
  });

  return <div {...moverAttribute} {...rootProps} className={className} ref={ref} />;
});
Chat.displayName = 'Chat';
