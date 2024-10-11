import * as React from 'react';
import type { Preview } from '@storybook/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

// TODO: import components and styles from the Fluent Storybook Addon when it is published
import { FluentDocsContainer } from './components/FluentDocsContainer';
import { FluentDocsPage } from './components/FluentDocsPage';
import './docs-root.css';
import './docs-root-v9.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <Story />
      </FluentProvider>
    ),
  ],
  parameters: {
    viewMode: 'docs',
    controls: {
      disable: true,
      expanded: true,
    },
    docs: {
      container: FluentDocsContainer,
      page: FluentDocsPage,
    },
  },
};

export default preview;
