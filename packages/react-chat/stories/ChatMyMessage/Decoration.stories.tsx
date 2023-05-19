import * as React from 'react';
import { Chat, ChatMyMessage } from '@fluentui-contrib/react-chat';

export const Decoration = () => {
  return (
    <Chat>
      <ChatMyMessage decoration="important">Important message</ChatMyMessage>
      <ChatMyMessage decoration="urgent">Urgent message</ChatMyMessage>
    </Chat>
  );
};
