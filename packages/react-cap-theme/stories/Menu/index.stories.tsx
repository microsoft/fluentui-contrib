import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Menu } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;

export { Default } from './Default.stories';
