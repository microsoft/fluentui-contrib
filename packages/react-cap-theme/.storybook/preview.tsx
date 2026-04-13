import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryFn } from '@storybook/react';

const capTheme = {
  ...webLightTheme,
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
};

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
  tags: ['autodocs'],
};

export default preview;
