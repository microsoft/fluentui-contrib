import * as React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { CapFoundations } from '@fluentui-contrib/cap-foundations-core';

// Point the runtime at the staticDirs-served theme files
CapFoundations.configure({ basePath: '/themes' });

const themeDecorator: Decorator = (Story): React.ReactElement => (
  <div data-theme="default" data-mode="light" style={{ padding: '1rem' }}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [themeDecorator],
  parameters: {
    viewMode: 'docs',
    controls: {
      disable: false,
      expanded: true,
    },
    docs: {
      codePanel: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
