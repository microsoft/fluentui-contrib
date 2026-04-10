import rootPreview from '../../../.storybook/preview';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';
import { FIXME_MISSING_TOKENS_DEFAULTS } from '../src/components/tokens/types';
import type { JSXElement } from '@fluentui/react-utilities';

import type { Preview, StoryFn } from '@storybook/react';

// Merge webLightTheme with the CAP-specific tokens that aren't yet in Fluent's base theme.
// FluentProvider injects all theme keys as CSS custom properties, so CAP style hooks
// can resolve var(--borderRadius2XLarge), var(--colorNeutralStroke4), etc.
const capTheme = { ...webLightTheme, ...FIXME_MISSING_TOKENS_DEFAULTS };

const preview: Preview = {
  ...rootPreview,
  decorators: [
     
    (Story: StoryFn): JSXElement => (
      <FluentProvider theme={capTheme as any} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
        <Story />
      </FluentProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
