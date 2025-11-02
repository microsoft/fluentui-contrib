import * as React from 'react';
import type { Preview } from '@storybook/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

// TODO: import components and styles from the Fluent Storybook Addon when it is published
import { FluentDocsContainer } from './copied-from-fluentui-core/components/FluentDocsContainer';
import { FluentDocsPage } from './copied-from-fluentui-core/components/FluentDocsPage';
import './copied-from-fluentui-core/docs-root.css';
import './copied-from-fluentui-core/docs-root-v9.css';

const preview = {
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
      codePanel: true,
    },
  },

  tags: ['autodocs'],
};

export default preview;
