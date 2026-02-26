import type { Preview } from '@storybook/react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootPreview from '../../../.storybook/preview';

const preview: Preview = {
  ...rootPreview,
  parameters: {
    ...rootPreview.parameters,
    controls: {
      ...(rootPreview.parameters?.controls ?? {}),
      disable: false,
      expanded: true,
    },
  },
};

export default preview;
