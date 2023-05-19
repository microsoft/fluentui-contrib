import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Chat, ChatMessage } from '@fluentui-contrib/react-chat';

export const Default = () => {
  return (
    <Chat>
      <ChatMessage
        avatar={
          <Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />
        }
      >
        Hello I am Ashley
      </ChatMessage>
    </Chat>
  );
};
