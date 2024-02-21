/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-components';

import type {
  ChatMyMessageSlots,
  ChatMyMessageState,
} from './ChatMyMessage.types';

export const renderChatMyMessage_unstable = (state: ChatMyMessageState) => {
  assertSlots<ChatMyMessageSlots>(state);
  return (
    <state.root>
      <state.body>
        <div className={state.nameLineClassName}>
          {state.author && <state.author />}
          {state.timestamp && <state.timestamp />}
          {state.details && !state.statusMessage && <state.details />}
          {state.statusMessage && <state.statusMessage />}
        </div>

        {state.decorationLabel && <state.decorationLabel />}

        {state.body.children}

        {state.decorationIcon && <state.decorationIcon />}

        {state.reactions && <state.reactions />}
      </state.body>

      {state.statusIcon && <state.statusIcon />}

      {state.actions && <state.actions />}
    </state.root>
  );
};
