import { Meta } from '@storybook/react';
import description from '../README.md';

export { Default } from './Default.stories';
export { SingleElements } from './SingleElements.stories';
export { ComposedElements } from './ComposedElements.stories';
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
