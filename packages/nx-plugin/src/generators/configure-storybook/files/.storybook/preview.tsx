
import * as React from 'react';

import { Preview } from '@storybook/react';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <Story />
      </FluentProvider>
    ),
  ],
};

export default preview;