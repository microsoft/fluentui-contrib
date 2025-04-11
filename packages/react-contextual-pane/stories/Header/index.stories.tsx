import type { Meta } from '@storybook/react';
import { Header } from '@fluentui-contrib/react-contextual-pane';
export { Default } from './Default.stories';
export { LongTitle } from './LongTitle.stories';
export { Brand } from './Brand.stories';
export { Actions } from './Actions.stories';
export { Truncation } from './Truncation.stories';

const meta = {
  title: 'Packages/react-contextual-pane/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
