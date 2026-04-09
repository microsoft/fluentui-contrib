import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Badge } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

export { Default } from './Default.stories';
