import * as React from 'react';
import { Chat, ChatMyMessage } from '@fluentui-contrib/react-chat';

export const Status = () => {
  return (
    <Chat>
      <ChatMyMessage status="failed">Failed message</ChatMyMessage>
      <ChatMyMessage status="sending">Sending message</ChatMyMessage>
      <ChatMyMessage status="received">Received message</ChatMyMessage>
      <ChatMyMessage status="read">Read message</ChatMyMessage>
      <ChatMyMessage status="blocked">Blocked message</ChatMyMessage>
      <ChatMyMessage status="scheduled">Scheduled message</ChatMyMessage>
    </Chat>
  );
};
