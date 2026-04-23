import { Meta } from '@storybook/react';

export { Default } from './Default.stories';
export { Portals } from './Portals.stories';
export { InsertionPoint } from './InsertionPoint.stories';

const meta: Meta = {
  title: 'Packages/react-shadow',
  parameters: {
    docs: {
      description: {
        component:
          'This package provides a React component that renders its children inside a shadow DOM.',
      },
    },
  },
};

export default meta;
