import * as React from 'react';
import { Meta } from '@storybook/react';
import { Chat } from '@fluentui-contrib/react-chat';
export { Default } from './Default.stories';
export { ChatWithFocusableContent } from './ChatWithFocusableContent.stories';

const meta: Meta<typeof Chat> = {
  component: Chat,
};

export default meta;
