import type { Meta } from '@storybook/react';
import { Footer } from '@fluentui-contrib/react-contextual-pane';
export { Default } from './Default.stories';
export { CustomChildren } from './CustomChildren.stories';

const meta = {
  title: 'Packages/react-contextual-pane/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
