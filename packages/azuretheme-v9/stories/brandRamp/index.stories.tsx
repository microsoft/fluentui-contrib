import * as React from 'react';
import { Meta } from '@storybook/react';
import { brandRamp } from '@fluentui-contrib/azuretheme-v9';
export { Default } from './Default.stories';

const meta: Meta<typeof brandRamp> = {
  component: brandRamp,
};

export default meta;
