/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-components';
import type { ChatMessageState, ChatMessageSlots } from './ChatMessage.types';

/**
 * Render the final JSX of ChatMessage
 */
export const renderChatMessage_unstable = (state: ChatMessageState) => {
  assertSlots<ChatMessageSlots>(state);

  return (
    <state.root>
      {state.avatar && <state.avatar />}

      <state.body>
        <div className={state.nameLineClassName}>
          {state.author && <state.author />}
          {state.timestamp && <state.timestamp />}
          {state.details && <state.details />}
        </div>

        {state.decorationLabel && <state.decorationLabel />}

        {state.body.children}

        {state.decorationIcon && <state.decorationIcon />}

        {state.reactions && <state.reactions />}
      </state.body>
    </state.root>
  );
};
