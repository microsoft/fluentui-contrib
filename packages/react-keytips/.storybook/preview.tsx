import { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components';

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        webLightTheme: webLightTheme,
        webDarkTheme: webDarkTheme,
        teamsLightTheme: teamsLightTheme,
        teamsDarkTheme: teamsDarkTheme,
        teamsHighContrastTheme: teamsHighContrastTheme,
      },
      defaultTheme: 'webLightTheme',
      Provider: FluentProvider,
    }),
  ],
};

export default preview;
