import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Dialog } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

export { Default } from './Default.stories';
