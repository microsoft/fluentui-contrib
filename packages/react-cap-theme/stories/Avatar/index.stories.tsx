import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Avatar } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

export { Default } from './Default.stories';
