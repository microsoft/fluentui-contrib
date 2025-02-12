import { Meta } from '@storybook/react';
import { ChatMyMessage } from '@fluentui-contrib/react-chat';
export { Default } from './Default.stories';
export { Decoration } from './Decoration.stories';
export { Status } from './Status.stories';
export { Slots } from './Slots.stories';

const meta: Meta<typeof ChatMyMessage> = {
  title: 'Packages/react-chat/ChatMyMessage',
  component: ChatMyMessage,
};

export default meta;
