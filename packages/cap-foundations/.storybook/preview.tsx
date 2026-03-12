// eslint-disable-next-line @nx/enforce-module-boundaries
import rootPreview from '../../../.storybook/preview';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  ...rootPreview,
  tags: ['autodocs'],
};

export default preview;
