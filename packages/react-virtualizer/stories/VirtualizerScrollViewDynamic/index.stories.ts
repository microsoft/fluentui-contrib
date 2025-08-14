import description from './VirtualizerScrollViewDynamicDescription.md';
import accessibilityMd from './VirtualizerScrollViewDynamicAccessibility.md';
import { Meta } from '@storybook/react';
import { VirtualizerScrollViewDynamic } from '../../src/VirtualizerScrollViewDynamic';

export { AutoMeasure } from './AutoMeasure.stories';
export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { ScrollLoading } from './ScrollLoading.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

const meta: Meta<typeof VirtualizerScrollViewDynamic> = {
  title: 'Packages/react-virtualizer/VirtualizerScrollViewDynamic',
  component: VirtualizerScrollViewDynamic,
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
