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

  const handleChatMessageFocus = React.useCallback(
    () => setPopoverOpen(true),
    []
  );

  const modalizerAttributes = useTabsterAttributes({
    modalizer: {
      id: props.id,
      isOthersAccessible: true,
      isAlwaysAccessible: true,
      isTrapped: true,
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
        <ChatMyMessage
          onFocus={handleChatMessageFocus}
          {...props}
          {...modalizerAttributes}
        />
      </PopoverTrigger>
      <PopoverSurface {...modalizerAttributes}>
        <button>like</button>
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
