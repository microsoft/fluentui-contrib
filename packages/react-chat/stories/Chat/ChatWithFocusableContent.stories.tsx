import * as React from 'react';
import {
  Avatar,
  Button,
  Link,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  Toolbar,
  useId,
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

import { useTabsterAttributes } from '@fluentui/react-tabster';

interface User {
  name: string;
  status: PresenceBadgeStatus;
}

const ChatMessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) =>
<div ref={ref} {...props} role="document" tabIndex={0} />);

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
      tabIndex={-1}
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
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const messageId = useId('message');
  const contentId = `${messageId}-content`;
  const reactionsId = `${messageId}-reactions`;
  const timestampId = `${messageId}-timestamp`;
  const detailsId = `${messageId}-details`;
  const popoverSurfaceId = `${messageId}-popover-surface`;
  const ChatMessageType = user ? ChatMessage : ChatMyMessage;

  const messageRef = React.useRef<HTMLDivElement>(null);
  const messageContentRef = React.useRef<HTMLDivElement>(null);
  const firstButtonInPopoverRef = React.useRef<HTMLButtonElement>(null);
  const isPopoverOpenFromKeyDown = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (popoverOpen && isPopoverOpenFromKeyDown.current) {
      isPopoverOpenFromKeyDown.current = false;
      firstButtonInPopoverRef.current?.focus();
    }
  }, [popoverOpen]);

  const handlePopoverOpenChange: PopoverProps['onOpenChange'] = (event, { open }) =>
  setPopoverOpen(open);

  const handleChatMessageKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        messageContentRef.current?.focus();
        // targetDocument?.getElementById(contentId)?.focus();
      }else if (event.target === messageRef.current) {
      isPopoverOpenFromKeyDown.current = true;
    }
    }
  };

  const modalizerAttributes = useTabsterAttributes({
    modalizer: {
      id: messageId,
      isOthersAccessible: true,
      isAlwaysAccessible: true,
      isTrapped: true,
    },
    focusable: {
      ignoreKeydown: { Enter: true },
    },
  });

  return (
    <Popover
    openOnHover
    open={popoverOpen}
    onOpenChange={handlePopoverOpenChange}
    unstable_disableAutoFocus // prevent popover focus within popoverSurface on open
  >
    <PopoverTrigger>
        <ChatMessageType
        {...modalizerAttributes}
        ref={messageRef}
      
        role="group"
          avatar={user ? <Avatar name={user.name} badge={{ status: user.status }} /> : undefined}
          reactions={CustomReactions? <CustomReactions id={reactionsId} /> : undefined}
          timestamp={customTimestamp ? {children: customTimestamp, id: timestampId} : undefined}
          details={customDetails? {children: customDetails, id: detailsId} : undefined}
          onKeyDown={handleChatMessageKeyDown}
          {...(popoverOpen && { 'aria-owns': popoverSurfaceId })}
          aria-labelledby={`${contentId} ${reactionsId} ${timestampId} ${detailsId}`}
          aria-expanded={undefined}
          {...props}
        >
          <ChatMessageContent ref={messageContentRef} id={contentId}>{children}</ChatMessageContent>
        </ChatMessageType>
      </PopoverTrigger>
      <PopoverSurface
      {...modalizerAttributes}
      id={popoverSurfaceId}
      >
        <Toolbar>
        <Button ref={firstButtonInPopoverRef}>Like</Button>
        <Button>Heart</Button>
        <Button>Laugh</Button>
        <Button>Surprised</Button>
        <Button aria-expanded="false">More reactions</Button>
        </Toolbar>
        <Toolbar>
          <Button>Reply</Button>
          <Button>More options...</Button>
        </Toolbar>
      </PopoverSurface>
    </Popover>
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
    <>
      <h1>Chat with focusable content</h1>
    <div role="application">
      <button>Before chat</button>

      <Chat>
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
    </>
  );
};
