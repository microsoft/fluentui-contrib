import { Meta } from '@storybook/react';
import { azureDarkTheme } from '@fluentui-contrib/azure-theme';
export { Default } from './Default.stories';

const meta: Meta<typeof azureDarkTheme> = {
  component: azureDarkTheme,
};

export default meta;
