import * as React from 'react';
import {
  getPartitionedNativeProps,
  resolveShorthand,
} from '@fluentui/react-components';
import type { ChatMessageProps, ChatMessageState } from './ChatMessage.types';
import { getDecorationIcon } from '../utils/getDecorationIcon';
import { useChatMessageFocusableGroup } from '../utils/useChatMessageFocusableGroup';
import { useChatMessagePopoverTrigger } from '../utils/useChatMessagePopoverTrigger';

/**
 * Create the state required to render ChatMessage.
 *
 * The returned state can be modified with hooks such as useChatMessageStyles_unstable,
 * before being passed to renderChatMessage_unstable.
 *
 * @param props - props from this instance of ChatMessage
 * @param ref - reference to root HTMLElement of ChatMessage
 */
export const useChatMessage_unstable = (
  props: ChatMessageProps,
  ref: React.Ref<HTMLDivElement>
): ChatMessageState => {
  const {
    attached,
    author,
    avatar,
    body,
    decoration,
    decorationIcon,
    decorationLabel,
    details,
    persistentTimestamp,
    reactions,
    root,
    showAnimation,
    timestamp,
  } = props;

  /**
   * Splits the native props into ones that go to the `root` slot, and ones that go to the primary slot.
   * The primary slot is the `body` slot in this case.
   */
  const nativeProps = getPartitionedNativeProps<
    ChatMessageProps &
      Pick<
        React.HTMLAttributes<HTMLElement>,
        'style' | 'className' | 'tabIndex'
      >,
    'tabIndex'
  >({
    primarySlotTagName: 'div',
    props,
    excludedPropNames: ['tabIndex'], // tabIndex from props will not be applied to the primary slot, as it should always be 0 for tabster navigation
  });

  const state: ChatMessageState = {
    attached,
    decoration,
    persistentTimestamp,
    showAnimation,

    body: resolveShorthand(body, {
      required: true,
      defaultProps: {
        ref,
        ...nativeProps.primary,
        tabIndex: 0,
      },
    }),
    root: resolveShorthand(root, {
      required: true,
      defaultProps: nativeProps.root,
    }),

    author: resolveShorthand(author),
    avatar:
      attached && attached !== 'top' ? undefined : resolveShorthand(avatar),
    decorationIcon: resolveShorthand(decorationIcon, {
      required: !!decoration,
    }),
    decorationLabel: resolveShorthand(decorationLabel),
    details: resolveShorthand(details),
    reactions: resolveShorthand(reactions),
    timestamp: resolveShorthand(timestamp),

    components: {
      author: 'div',
      avatar: 'div',
      body: 'div',
      decorationIcon: 'div',
      decorationLabel: 'div',
      details: 'div',
      reactions: 'div',
      root: 'div',
      timestamp: 'span',
    },
  };

  if (state.decorationIcon && !state.decorationIcon.children) {
    state.decorationIcon.children = getDecorationIcon(decoration);
  }

  useChatMessagePopoverTrigger(state);
  useChatMessageFocusableGroup(state);

  return state;
};
