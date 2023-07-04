import * as React from 'react';
import {
  Chat,
  ChatMyMessage,
  ChatMyMessageProps,
} from '@fluentui-contrib/react-chat';
import {
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';
import { useTabsterAttributes } from '@fluentui/react-tabster';

const ChatMyMessageWithPopover = (
  props: ChatMyMessageProps & { id: string }
) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const handlePopoverOpenChange: PopoverProps['onOpenChange'] = (
    _e,
    { open }
  ) => setPopoverOpen(open);

  const modalizerAttributes = useTabsterAttributes({
    modalizer: {
      id: props.id,
      isOthersAccessible: true,
      isAlwaysAccessible: true,
      isTrapped: true,
    },
    focusable: {
      ignoreKeydown: { Enter: true },
    },
  });

  const messageRef = React.useRef<HTMLDivElement>(null);
  const firstButtonInPopoverRef = React.useRef<HTMLButtonElement>(null);
  const isPopoverOpenFromKeyDown = React.useRef<boolean>(false);
  const handleChatMessageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target === messageRef.current) {
      isPopoverOpenFromKeyDown.current = true;
    }
  };
  React.useEffect(() => {
    if (popoverOpen && isPopoverOpenFromKeyDown.current) {
      isPopoverOpenFromKeyDown.current = false;
      firstButtonInPopoverRef.current?.focus();
    }
  }, [popoverOpen]);

  const popoverSurfaceId = `${props.id}-popover-surface`;

  return (
    <Popover
      openOnHover
      open={popoverOpen}
      onOpenChange={handlePopoverOpenChange}
      unstable_disableAutoFocus // prevent popover focus within popoverSurface on open
    >
      <PopoverTrigger>
        <ChatMyMessage
          {...props}
          {...modalizerAttributes}
          role="group"
          aria-expanded={undefined}
          onKeyDown={handleChatMessageKeyDown}
          ref={messageRef}
          {...(popoverOpen && { 'aria-owns': popoverSurfaceId })}
        />
      </PopoverTrigger>
      <PopoverSurface {...modalizerAttributes} id={popoverSurfaceId}>
        <button ref={firstButtonInPopoverRef}>like</button>
        <button>heart</button>
      </PopoverSurface>
    </Popover>
  );
};

export const WithPopover = () => {
  return (
    <>
      <button>before chat</button>
      <Chat>
        <ChatMyMessageWithPopover id={'message-id-1'}>
          message 2 with links. Here is{' '}
          <a href="https://react.fluentui.dev/?path=/docs/concepts-introduction--page">
            fluent v9
          </a>{' '}
          and{' '}
          <a href="https://fluentsite.z22.web.core.windows.net">fluent v0</a>
        </ChatMyMessageWithPopover>
      </Chat>
      <button>after chat</button>
    </>
  );
};
