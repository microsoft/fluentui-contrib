import { VirtualizerScrollViewDynamic } from '@fluentui/react-virtualizer';
import descriptionMd from './VirtualizerScrollViewDynamicDescription.md';
import accessibilityMd from './VirtualizerScrollViewDynamicAccessibility.md';

export { AutoMeasure } from './AutoMeasure.stories';
export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { ScrollLoading } from './ScrollLoading.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

import { Meta } from '@storybook/react';
import description from '../../README.md';

const meta: Meta = {
  title: 'Packages/react-virtualizer/VirtualizerScrollViewDynamic',
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
