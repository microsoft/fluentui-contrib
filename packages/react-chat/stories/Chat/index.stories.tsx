import { Meta } from '@storybook/react';
import { Chat } from '@fluentui-contrib/react-chat';

export { Default } from './Default.stories';
export { ChatWithFocusableContent } from './ChatWithFocusableContent.stories';

const meta: Meta<typeof Chat> = {
  title: 'Packages/react-chat/Chat',
  component: Chat,
  parameters: {
    docs: {
      description: {
        component:
          'Chat component powered by Fluent UI and used in Microsoft Teams. Use it as the container for ChatMessage and ChatMyMessage building blocks.',
      },
    },
  },
};

export default meta;
