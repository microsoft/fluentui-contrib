import { Meta } from '@storybook/react';
import description from '../../README.md';

export { Default } from './Default.stories';
export { Portals } from './Portals.stories';
export { InsertionPoint } from './InsertionPoint.stories';

const meta: Meta = {
  title: 'Packages/react-shadow',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
