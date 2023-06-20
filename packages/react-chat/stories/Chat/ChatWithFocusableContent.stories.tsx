import * as React from 'react';

import {
  Avatar,
} from '@fluentui/react-components';
import {
  Chat,
  ChatMessage,
  ChatMyMessage,
} from '@fluentui-contrib/react-chat';

const ChatMessageContent = ({ id, children, ...rest }) => (
  <div
    {...rest}
    id={id}
    tabIndex={0}
    aria-readingmode="true"
  >{children}</div>
);

interface User {
  name;
  status;
}

interface ExtendedChatMessageProps {
  user?;
  contentId;
  children;
}
const ExtendedChatMessage: React.FC<ExtendedChatMessageProps> = ({ user, contentId, children, ...rest }) => {
  const handleMessageKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      document.getElementById(contentId).focus();
    }
  };

  return (
    <>
      {!user ? (
        <ChatMyMessage
          {...rest}
          onKeyDown={handleMessageKeyDown}
        >
          <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMyMessage>
      ) : (
        <ChatMessage
          {...rest}
          avatar={<Avatar name={user.name} badge={{ status: user.status }} />}
          onKeyDown={handleMessageKeyDown}
        >
          <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMessage>
      )}
    </>
  );
};

export const ChatWithFocusableContent: React.FC = () => {
  const user1: User = { name: 'Ashley McCarthy', status: 'available' };

  return (
    <div>
      <h1>Chat with focusable content</h1>
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
