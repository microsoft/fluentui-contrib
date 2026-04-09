import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  ...rootPreview,
  decorators: [
    (Story) => (
      <FluentProvider
        theme={webLightTheme}
        customStyleHooks_unstable={CAP_STYLE_HOOKS}
      >
        <Story />
      </FluentProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
