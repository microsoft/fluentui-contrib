import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Tooltip } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

export { Default } from './Default.stories';
