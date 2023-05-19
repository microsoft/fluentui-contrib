import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChatMessageState } from '../ChatMessage/ChatMessage.types';
import { ChatMyMessageState } from '../ChatMyMessage/ChatMyMessage.types';

export const useChatMessageFocusableGroup = (
  state: Pick<ChatMessageState | ChatMyMessageState, 'body'>
) => {
  const groupperAttributes = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  (state.body as Record<string, string | undefined>)['data-tabster'] =
    groupperAttributes['data-tabster'];
};
