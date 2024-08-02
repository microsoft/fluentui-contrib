import { assertSlots } from '@fluentui/react-components';
import type { ChatState, ChatSlots } from './Chat.types';

/**
 * Render the final JSX of Chat
 */
export const renderChat_unstable = (state: ChatState) => {
  assertSlots<ChatSlots>(state);

  return <state.root />;
};
