import { Meta } from '@storybook/react';
import { Chat } from '@fluentui-contrib/react-chat';
import description from '../../README.md';

export { Default } from './Default.stories';
export { ChatWithFocusableContent } from './ChatWithFocusableContent.stories';

const meta: Meta<typeof Chat> = {
  title: 'Packages/react-chat/Chat',
  component: Chat,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
