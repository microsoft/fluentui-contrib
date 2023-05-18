import { getSlots } from '@fluentui/react-components';
import * as React from 'react';

import type { ChatMyMessageSlots, ChatMyMessageState } from './ChatMyMessage.types';

export const renderChatMyMessage_unstable = (state: ChatMyMessageState) => {
  const { slots, slotProps } = getSlots<ChatMyMessageSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.body {...slotProps.body}>
        <div className={state.nameLineClassName}>
          {slots.author && <slots.author {...slotProps.author} />}
          {slots.timestamp && <slots.timestamp {...slotProps.timestamp} />}
          {slots.details && !slots.statusMessage && <slots.details {...slotProps.details} />}
          {slots.statusMessage && <slots.statusMessage {...slotProps.statusMessage} />}
        </div>

        {slots.decorationLabel && <slots.decorationLabel {...slotProps.decorationLabel} />}

        {slotProps.body.children}

        {slots.decorationIcon && <slots.decorationIcon {...slotProps.decorationIcon} />}

        {slots.reactions && <slots.reactions {...slotProps.reactions} />}
      </slots.body>

      {slots.statusIcon && <slots.statusIcon {...slotProps.statusIcon} />}

      {slots.actions && <slots.actions {...slotProps.actions} />}
    </slots.root>
  );
};
