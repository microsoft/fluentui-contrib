import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryFn } from '@storybook/react';

const preview: Preview = {
  ...rootPreview,
  decorators: [
    (Story: StoryFn): JSXElement => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- CAP tokens extend Fluent's Theme type
      <FluentProvider theme={webLightTheme as any} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
        <Story />
      </FluentProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
