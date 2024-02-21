import * as React from 'react';
import { useChat_unstable } from './useChat';
import { renderChat_unstable } from './renderChat';
import { useChatStyles_unstable } from './useChatStyles.styles';
import type { ChatProps } from './Chat.types';
import type { ForwardRefComponent } from '@fluentui/react-components';

export const Chat: ForwardRefComponent<ChatProps> = React.forwardRef(
  (props, ref) => {
    const state = useChat_unstable(props, ref);

    useChatStyles_unstable(state);
    return renderChat_unstable(state);
  }
);

Chat.displayName = 'Chat';
