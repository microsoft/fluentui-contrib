import * as React from 'react';

import type {
  ChatMyMessageProps,
  ChatMyMessageState,
} from './ChatMyMessage.types';

import {
  getPartitionedNativeProps,
  slot,
  useFocusableGroup,
} from '@fluentui/react-components';
import {
  CheckmarkCircle16Regular,
  Circle16Regular,
  Clock16Regular,
  Eye16Filled,
  Flag16Filled,
  Warning16Filled,
} from '@fluentui/react-icons';

import { getDecorationIcon } from '../utils/getDecorationIcon';
import { useChatMessagePopoverTrigger } from '../utils/useChatMessagePopoverTrigger';

export const useChatMyMessage_unstable = (
  props: ChatMyMessageProps,
  ref: React.Ref<HTMLDivElement>
): ChatMyMessageState => {
  const {
    actions,
    attached,
    author,
    body,
    decoration,
    decorationIcon,
    decorationLabel,
    details,
    reactions,
    root,
    showAnimation,
    status,
    statusIcon,
    statusMessage,
    timestamp,
  } = props;

  /**
   * Splits the native props into ones that go to the `root` slot, and ones that go to the primary slot.
   * The primary slot is the `body` slot in this case.
   */
  const nativeProps = getPartitionedNativeProps<
    ChatMyMessageProps &
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

  const groupperAttributes = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  const state: ChatMyMessageState = {
    attached,
    decoration,
    showAnimation,
    status,

    body: slot.always(body, {
      defaultProps: {
        ref,
        ...groupperAttributes,
        ...nativeProps.primary,
        tabIndex: 0,
      },
      elementType: 'div',
    }),
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),

    actions: slot.optional(actions, { elementType: 'div' }),
    author: slot.optional(author, { elementType: 'div' }),
    decorationIcon: slot.optional(decorationIcon, {
      elementType: 'div',
      defaultProps: {
        children: getDecorationIcon(decoration),
      },
      renderByDefault: !!decoration,
    }),
    decorationLabel: slot.optional(decorationLabel, { elementType: 'div' }),
    details: slot.optional(details, { elementType: 'div' }),
    reactions: slot.optional(reactions, { elementType: 'div' }),
    statusIcon: slot.optional(statusIcon, {
      elementType: 'div',
      defaultProps: {
        children: getStatusIcon(status),
      },
      renderByDefault: !!status,
    }),
    statusMessage: slot.optional(statusMessage, { elementType: 'div' }),
    timestamp: slot.optional(timestamp, { elementType: 'span' }),

    components: {
      actions: 'div',
      author: 'div',
      body: 'div',
      decorationIcon: 'div',
      decorationLabel: 'div',
      details: 'div',
      reactions: 'div',
      root: 'div',
      statusIcon: 'div',
      statusMessage: 'div',
      timestamp: 'span',
    },
  };

  useChatMessagePopoverTrigger(state);

  return state;
};

const getStatusIcon = (status: ChatMyMessageProps['status']) => {
  switch (status) {
    case 'sending':
      return <Circle16Regular />;
    case 'received':
      return <CheckmarkCircle16Regular />;
    case 'read':
      return <Eye16Filled />;
    case 'failed':
      return <Warning16Filled />;
    case 'blocked':
      return <Flag16Filled />;
    case 'scheduled':
      return <Clock16Regular />;
  }
};
