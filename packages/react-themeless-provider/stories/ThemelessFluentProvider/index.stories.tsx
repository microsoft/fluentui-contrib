// import * as React from 'react';
import { Meta } from '@storybook/react';
import { ThemelessFluentProvider } from '@fluentui-contrib/react-themeless-provider';
export { Default } from './Default.stories';

const meta: Meta<typeof ThemelessFluentProvider> = {
  component: ThemelessFluentProvider,
};

export default meta;
