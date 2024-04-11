import * as React from 'react';
import { Meta } from '@storybook/react';
import { highContrast } from '@fluentui-contrib/azuretheme-v9';
export { Default } from './Default.stories';

const meta: Meta<typeof highContrast> = {
  component: highContrast,
};

export default meta;
