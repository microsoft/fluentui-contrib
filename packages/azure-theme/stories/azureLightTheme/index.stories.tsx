import { Meta } from '@storybook/react';
import { azureLightTheme } from '@fluentui-contrib/azure-theme';
export { Default } from './Default.stories';

const meta: Meta<typeof azureLightTheme> = {
  component: azureLightTheme,
};

export default meta;
