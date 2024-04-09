import * as React from 'react';
import { Meta } from '@storybook/react';
import { lightTheme } from '@fluentui-contrib/azuretheme-v9';
export { Default } from './Default.stories';

const meta: Meta<typeof lightTheme> = {
  component: lightTheme,
};

export default meta;
