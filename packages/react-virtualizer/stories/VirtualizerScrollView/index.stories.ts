import accessibilityMd from './VirtualizerScrollViewAccessibility.md';
import description from './VirtualizerScrollViewDescription.md';
import { VirtualizerScrollView } from '../../src/VirtualizerScrollView';
import { Meta } from '@storybook/react';

export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

const meta: Meta<typeof VirtualizerScrollView> = {
  title: 'Packages/react-virtualizer/VirtualizerScrollView',
  component: VirtualizerScrollView,
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
