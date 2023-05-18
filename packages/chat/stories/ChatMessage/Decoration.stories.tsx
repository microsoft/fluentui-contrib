import * as React from 'react';
import { Chat, ChatMessage } from '@fluentui-contrib/chat';

export const Decoration = () => {
  return (
    <Chat>
      <ChatMessage decoration="important">Important message</ChatMessage>
      <ChatMessage decoration="urgent">Urgent message</ChatMessage>
      <ChatMessage decoration="mention">Message with mention</ChatMessage>
      <ChatMessage decoration="mentionEveryone">Message mentioning everyone</ChatMessage>
    </Chat>
  );
};