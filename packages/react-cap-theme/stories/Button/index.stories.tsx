import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export { Default } from './Default.stories';
