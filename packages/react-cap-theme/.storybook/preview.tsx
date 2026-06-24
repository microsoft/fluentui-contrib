import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS, CAP_THEME_TOKENS } from '../src/index';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryFn } from '@storybook/react';

// Imported after `rootPreview` so this package's docs overrides win.
import './docs.css';

const capTheme = { ...webLightTheme, ...CAP_THEME_TOKENS };

const preview: Preview = {
  ...rootPreview,
  decorators: [
    (Story: StoryFn): JSXElement => (
      <FluentProvider
        theme={capTheme as any}
        customStyleHooks_unstable={CAP_STYLE_HOOKS}
      >
        <Story />
      </FluentProvider>
    ),
  ],
  parameters: {
    ...rootPreview.parameters,
    options: {
      storySort: {
        order: [
          'Packages',
          [
            'react-cap-theme',
            [
              'Getting Started',
              'Design Language',
              ['Overview', 'Rounded Corners'],
              'Components',
              '*',
            ],
          ],
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
