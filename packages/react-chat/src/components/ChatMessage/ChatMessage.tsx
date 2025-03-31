import * as React from 'react';
import { useChatMessage_unstable } from './useChatMessage';
import { renderChatMessage_unstable } from './renderChatMessage';
import { useChatMessageStyles_unstable } from './ChatMessage.styles';
import type { ChatMessageProps } from './ChatMessage.types';
import type { ForwardRefComponent } from '@fluentui/react-components';

/**
 * ChatMessage component - TODO: add more docs
 */
export const ChatMessage: ForwardRefComponent<ChatMessageProps> =
  React.forwardRef((props, ref) => {
    const state = useChatMessage_unstable(props, ref);

    useChatMessageStyles_unstable(state);
    return renderChatMessage_unstable(state);
  });

ChatMessage.displayName = 'ChatMessage';
