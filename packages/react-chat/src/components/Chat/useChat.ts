import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-components';
import type { ChatProps, ChatState } from './Chat.types';
import { useChatMoverAttribute_unstable } from './useChatMoverAttribute';

/**
 * Create the state required to render Chat.
 *
 * The returned state can be modified with hooks such as useChatStyles_unstable,
 * before being passed to renderChat_unstable.
 *
 * @param props - props from this instance of Chat
 * @param ref - reference to root HTMLElement of Chat
 */
export const useChat_unstable = (
  props: ChatProps,
  ref: React.Ref<HTMLDivElement>
): ChatState => {
  const arrowAttrs = useChatMoverAttribute_unstable();

  const state: ChatState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        ...arrowAttrs,
      }),
      { elementType: 'div' }
    ),
  };

  return state;
};
