import * as React from 'react';
import { Meta } from '@storybook/react';
import { darkTheme } from '@fluentui-contrib/azuretheme-v9';
export { Default } from './Default.stories';

const meta: Meta<typeof darkTheme> = {
  component: darkTheme,
};

export default meta;
