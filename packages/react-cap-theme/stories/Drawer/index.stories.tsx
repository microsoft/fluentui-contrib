import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DrawerBody } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Drawer',
  component: DrawerBody,
} satisfies Meta<typeof DrawerBody>;

export default meta;

export { Default } from './Default.stories';
