import { Meta } from '@storybook/react';
import description from '../README.md';

export { Default } from './Default.stories';
export { BasicInputs } from './BasicInputs.stories';
export { MultipleGroups } from './MultipleGroups.stories';

const meta: Meta = {
  title: 'Packages/react-gamepad-navigation',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
