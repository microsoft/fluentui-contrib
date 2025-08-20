import description from '../../README.md';
import { Meta } from '@storybook/react';
import { Virtualizer } from '../../src/Virtualizer';

export { Default } from './Default.stories';
export { DefaultUnbounded } from './DefaultUnbounded.stories';
export { Dynamic } from './Dynamic.stories';
export { Horizontal } from './Horizontal.stories';
export { ReversedHorizontal } from './ReversedHorizontal.stories';
export { Reversed } from './Reversed.stories';
export { RTL } from './RTL.stories';
export { MultiUnbounded } from './MultiUnbounded.stories';

const meta: Meta<typeof Virtualizer> = {
  title: 'Packages/react-virtualizer/Virtualizer',
  component: Virtualizer,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
