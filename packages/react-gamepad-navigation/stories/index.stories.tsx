import { Meta } from '@storybook/react';

export { Default } from './Default.stories';
export { SingleElements } from './SingleElements.stories';
export { ComposedElements } from './ComposedElements.stories';
export { MultipleGroups } from './MultipleGroups.stories';

const meta: Meta = {
  title: 'Packages/react-gamepad-navigation',
  parameters: {
    docs: {
      description: {
        component:
          'Experimental gamepad navigation support for Fluent UI components via the Gamepad API and focus-management hooks.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
