import accessibilityMd from './VirtualizerScrollViewAccessibility.md';

export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

import { Meta } from '@storybook/react';
import description from '../../README.md';

const meta: Meta = {
  title: 'Packages/react-virtualizer/VirtualizerScrollView',
  parameters: {
    docs: {
      description: {
        accessibilityMd: accessibilityMd,
        component: description,
      },
    },
  },
};

export default meta;
