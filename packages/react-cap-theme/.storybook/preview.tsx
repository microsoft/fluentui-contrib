import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import { DEFAULT_THEME, THEMES, type ThemeId } from './themes';
import './docs-theme-fill.css';

const preview: Preview = {
  ...rootPreview,
  globalTypes: {
    theme: {
      description: 'Theme used to render the components',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: (Object.keys(THEMES) as ThemeId[]).map((value) => ({
          value,
          title: THEMES[value].title,
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: DEFAULT_THEME,
  },
  decorators: [
    (Story: StoryFn, context: StoryContext): JSXElement => {
      const themeId = (context.globals.theme as ThemeId) ?? DEFAULT_THEME;
      const { theme, styleHooks } = THEMES[themeId] ?? THEMES[DEFAULT_THEME];

      return (
        <FluentProvider theme={theme} customStyleHooks_unstable={styleHooks}>
          <Story />
        </FluentProvider>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
