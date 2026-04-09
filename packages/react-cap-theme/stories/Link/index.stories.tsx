import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Link } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

export { Default } from './Default.stories';
