import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

export { Default } from './Default.stories';
