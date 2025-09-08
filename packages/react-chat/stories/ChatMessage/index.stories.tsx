import { Meta } from '@storybook/react';
import { ChatMessage } from '@fluentui-contrib/react-chat';

export { Default } from './Default.stories';
export { Decoration } from './Decoration.stories';
export { Slots } from './Slots.stories';

const meta: Meta<typeof ChatMessage> = {
  title: 'Packages/react-chat/ChatMessage',
  component: ChatMessage,
};

export default meta;
