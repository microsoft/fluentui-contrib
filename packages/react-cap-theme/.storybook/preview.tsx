import * as React from 'react';
import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';
import { FIXME_MISSING_TOKENS_DEFAULTS } from '../src/components/tokens/types';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryFn } from '@storybook/react';

// @fluentui/tokens@1.0.0-alpha.22 does not yet include borderRadius2XLarge and
// colorNeutralStroke4 variants. Merge them into webLightTheme so FluentProvider
// injects the corresponding CSS custom properties for CAP style hooks to resolve.
const capTheme = { ...webLightTheme, ...FIXME_MISSING_TOKENS_DEFAULTS };

const preview: Preview = {
  ...rootPreview,
  decorators: [
    (Story: StoryFn): JSXElement => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- CAP tokens extend Fluent's Theme type
      <FluentProvider theme={capTheme as any} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
        <Story />
      </FluentProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
