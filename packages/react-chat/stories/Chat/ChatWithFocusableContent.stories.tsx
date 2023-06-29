import * as React from 'react';
import {
  Avatar,
  Link,
  useFluent,
  PresenceBadgeStatus,
} from '@fluentui/react-components';
import { Chat, ChatMessage, ChatMyMessage } from '@fluentui-contrib/react-chat';

interface User {
  name: string;
  status: PresenceBadgeStatus;
}

interface CustomChatMessageProps {
  user?: User;
  contentId: string;
  children: React.ReactNode;
}

const ChatMessageContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => <div {...props} role="none" tabIndex={0} />;

const CustomChatMessage: React.FC<CustomChatMessageProps> = ({
  user,
  contentId,
  children,
}) => {
  const { targetDocument } = useFluent();
  const handleMessageKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      targetDocument?.getElementById(contentId)?.focus();
    }
  };

  return (
    <>
      {user ? (
        <ChatMessage
          avatar={<Avatar name={user.name} badge={{ status: user.status }} />}
          onKeyDown={handleMessageKeyDown}
        >
          <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMessage>
      ) : (
        <ChatMyMessage onKeyDown={handleMessageKeyDown}>
          <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMyMessage>
      )}
    </>
  );
};

interface  ChatLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
children: React.ReactNode;
}

const ChatLink: React.FC<ChatLinkProps> = ({ children, ...props } ) => 
<Link {...props} aria-label={`Link ${children?.toString()}`} />;

export const ChatWithFocusableContent: React.FC = () => {
  const user1: User = { name: 'Ashley McCarthy', status: 'available' };

  return (
    <div>
      <h1>Chat with focusable content</h1>
      <button> start here</button>

      <Chat role="application">
        <CustomChatMessage user={user1} contentId="message1-content">
          Hello I am Ashley
        </CustomChatMessage>
        <CustomChatMessage contentId="message2-content">
          Nice to meet you!
        </CustomChatMessage>
        <CustomChatMessage user={user1} contentId="message3-content">
          This is <ChatLink href="#">my homepage</ChatLink>. Some text goes here to
          demonstrate reading of longer runs of texts. Now follows{' '}
          <a href="#">another link</a> which is also a dummy link.
        </CustomChatMessage>
      </Chat>
    </div>
  );
};
