import * as React from 'react';
import type { Meta } from '@storybook/react';
import { SpinButton } from '@fluentui/react-components';

const meta = {
  title: 'Packages/react-cap-theme/SpinButton',
  component: SpinButton,
} satisfies Meta<typeof SpinButton>;

export default meta;

export { Default } from './Default.stories';
export { Appearance } from './Appearance.stories';
export { Size } from './Size.stories';
export { Disabled } from './Disabled.stories';
export { Error } from './Error.stories';
export { ReadOnly } from './ReadOnly.stories';
export { All } from './States.stories';
