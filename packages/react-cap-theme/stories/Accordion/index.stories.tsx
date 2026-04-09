import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Accordion } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

export { Default } from './Default.stories';
