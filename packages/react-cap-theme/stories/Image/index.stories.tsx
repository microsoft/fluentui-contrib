import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Image } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Image',
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

export { Default } from './Default.stories';
