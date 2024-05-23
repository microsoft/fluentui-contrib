import * as React from 'react';

import { Preview } from '@storybook/react';
import { AzureLightTheme } from '../src/index';
import { FluentProvider } from '@fluentui/react-components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluentProvider theme={AzureLightTheme}>
        <Story />
      </FluentProvider>
    ),
  ],
};

export default preview;
