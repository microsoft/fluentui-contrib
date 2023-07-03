import * as React from 'react';
import {
  Avatar,
  Button,
  useId,
  Link,
  useFluent,
  PresenceBadgeStatus,
} from '@fluentui/react-components';
import {
  Chat,
  ChatMessage,
  ChatMessageProps,
  ChatMyMessageProps,
  ChatMyMessage,
} from '@fluentui-contrib/react-chat';
import {
  EmojiSmileSlightRegular,
} from '@fluentui/react-icons';

interface User {
  name: string;
  status: PresenceBadgeStatus;
}

const ChatMessageContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => <div {...props} role="none" tabIndex={0} />;

interface ReactionsProps {
id: string;
}
const Message1Reactions: React.FC<ReactionsProps> = ({ id }) => {
  return (
    <Button
    id={id}
      icon={{
        children: <EmojiSmileSlightRegular fontSize={16} />,
      }}
      appearance="subtle"
      aria-label="1 Smile reaction."
    >
      1
    </Button>
  );
};

type CustomChatMessageProps = ChatMessageProps & ChatMyMessageProps & {
  user?: User;
  CustomReactions?: React.FC<ReactionsProps>;
  customTimestamp?: string;
  customDetails?: string;
  children: React.ReactNode;
};
const CustomChatMessage: React.FC<CustomChatMessageProps> = ({
  user,
  CustomReactions,
  customTimestamp,
  customDetails,
  children,
  ...props
}) => {
  const messageId = useId('message');
  const contentId = `${messageId}-content`;
  const reactionsId = `${messageId}-reactions`;
  const timestampId = `${messageId}-timestamp`;
  const detailsId = `${messageId}-details`;

  const customProps = {
    reactions: CustomReactions? <CustomReactions id={reactionsId} /> : undefined,
    timestamp: customTimestamp ? {
      children: customTimestamp,
      id: timestampId,
    } : undefined,
    details: customDetails? {
      children: customDetails,
      id: detailsId,
    } : undefined,
    'aria-labelledby': `${contentId} ${reactionsId} ${timestampId} ${detailsId}`,
  };

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
          {...customProps}
          {...props}
        >
          <ChatMessageContent id={contentId}>{children}</ChatMessageContent>
        </ChatMessage>
      ) : (
        <ChatMyMessage
        onKeyDown={handleMessageKeyDown}
        {...customProps}
        {...props}
        // {...props}
        >
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
        <CustomChatMessage
        user={user1}
        CustomReactions={Message1Reactions}
        customTimestamp="June 20, 2023 9:35 AM."
        >
          Hello I am Ashley
        </CustomChatMessage>
        <CustomChatMessage
        customTimestamp="Today at 3:10 PM."
        customDetails="Edited"
        >
          Nice to meet you!
        </CustomChatMessage>
        <CustomChatMessage
        user={user1}
        customTimestamp="Today at 5:22 PM."
        >
          This is <ChatLink href="#">my homepage</ChatLink>. Some text goes here to
          demonstrate reading of longer runs of texts. Now follows{' '}
          <a href="#">another link</a> which is also a dummy link.
        </CustomChatMessage>
      </Chat>
    </div>
  );
};
