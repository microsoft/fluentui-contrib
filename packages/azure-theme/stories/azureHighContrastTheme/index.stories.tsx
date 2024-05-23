import { Meta } from '@storybook/react';
import { azureHighContrastTheme } from '@fluentui-contrib/azure-theme';
export { Default } from './Default.stories';

const meta: Meta<typeof azureHighContrastTheme> = {
  component: azureHighContrastTheme,
};

export default meta;
