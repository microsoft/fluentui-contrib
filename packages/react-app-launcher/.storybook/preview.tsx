import type { Preview } from '@storybook/react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootPreview from '../../../.storybook/preview';

const preview: Preview = {
  ...rootPreview,
  tags: ['autodocs'],
};

export default preview;
