import type { Meta } from '@storybook/react';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { getNovaDecorator } from '@nova/react-test-utils';
import { buildSchema } from 'graphql';
export { Default } from './Default.stories';

const meta = {
  title: 'Packages/react-contextual-pane/Header',
  component: Header,
  decorators: [getNovaDecorator(buildSchema(`type Query { noop: Boolean }`))],
} satisfies Meta<typeof Header>;

export default meta;
