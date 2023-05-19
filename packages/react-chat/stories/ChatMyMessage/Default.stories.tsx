import * as React from 'react';
import { Chat, ChatMyMessage } from '@fluentui-contrib/react-chat';

export const Default = () => {
  return (
    <Chat>
      <ChatMyMessage>Nice to meet you!</ChatMyMessage>
    </Chat>
  );
};
