import * as React from 'react';

import {
  mergeClasses,
  Avatar,
  PresenceBadgeStatus,
} from '@fluentui/react-components';
import {
  Chat,
  ChatMessage,
  ChatMyMessage,
} from '@fluentui-contrib/react-chat';

import { useStyles } from './AccessibleChat.styles';

const ChatMessageContent = ({ id, children }) => (
  <div
  role="none"
  id={id}
  tabIndex={0}
  >{children}</div>
);

interface User {
  name: string;
  status: PresenceBadgeStatus;
}

interface ExtendedChatMessageProps {
user?;
contentId;
children;
}
const ExtendedChatMessage: React.FC<ExtendedChatMessageProps> = ({ user, contentId, children, ...props }) => {
  const handleMessageKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      document.getElementById(contentId).focus();
    }
  };

  return (
    <>
    {!user ? (
      <ChatMyMessage
      onKeyDown={handleMessageKeyDown}
      >
        <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMyMessage>
    ) : (
      <ChatMessage
      avatar={<Avatar name={user.name} badge={{ status: user.status }} />}
      onKeyDown={handleMessageKeyDown}
      >
      <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
      </ChatMessage>
      )}
      </>
  );
};

export const AccessibleChat: React.FC = () => {
  const styles = useStyles();

  const user1: User = { name: 'Ashley McCarthy', status: 'available' };

  return (
    <div className={mergeClasses(styles.root)}>
      <h1>Accessible chat</h1>
      <button> start here</button>

      <Chat>
        <ExtendedChatMessage user={user1} contentId="message1-content">Hello I am Ashley</ExtendedChatMessage>
        <ExtendedChatMessage contentId="message2-content">Nice to meet you!</ExtendedChatMessage>
        <ExtendedChatMessage user={user1} contentId="message3-content">
          This is <a href="#">my homepage</a>. Some text goes here to demonstrate reading of longer runsof texts. Now follows <a href="#">another link</a> which is also a dummy link.
        </ExtendedChatMessage>
      </Chat>

    </div>
  );
};
