import * as React from 'react';

import { Preview } from '@storybook/react';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        {/*
          TreeGrid must be wrapped around role="application",
          to avoid some errors on JAWS
        */}
        <div role="application">
          <Story />
        </div>
      </FluentProvider>
    ),
  ],
};

export default preview;
