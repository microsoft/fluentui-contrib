import * as React from 'react';

import type { ChatMyMessageProps } from './ChatMyMessage.types';
import { renderChatMyMessage_unstable } from './renderChatMyMessage';
import { useChatMyMessage_unstable } from './useChatMyMessage';
import { useChatMyMessageStyles_unstable } from './ChatMyMessage.styles';

/**
 * ChatMyMessage component - renders legacy layout of comfy chat message from myself
 */
export const ChatMyMessage = React.forwardRef<
  HTMLDivElement,
  ChatMyMessageProps
>((props, ref) => {
  const state = useChatMyMessage_unstable(props, ref);
  useChatMyMessageStyles_unstable(state);
  return renderChatMyMessage_unstable(state);
});
ChatMyMessage.displayName = 'ChatMyMessage';
