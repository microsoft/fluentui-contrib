import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Popover } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

export { Default } from './Default.stories';
