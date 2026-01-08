import * as React from 'react';
import type { Decorator, Preview } from '@storybook/react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootPreview from '../../../.storybook/preview';
import { CAPThemeSelectionProvider } from '../stories/StorybookUtils';

const withCAPTheme: Decorator = (Story, context) => {
  const themeKey =
    (context.globals.capTheme as
      | 'current'
      | 'teams'
      | 'onedrive'
      | 'sharepoint') ?? 'current';
  return (
    <CAPThemeSelectionProvider themeKey={themeKey}>
      <Story />
    </CAPThemeSelectionProvider>
  );
};

const rootDecorators = rootPreview.decorators;
const normalizedDecorators: Decorator[] = Array.isArray(rootDecorators)
  ? rootDecorators
  : rootDecorators
  ? [rootDecorators]
  : [];

const preview: Preview = {
  ...rootPreview,
  decorators: [...normalizedDecorators, withCAPTheme],
  parameters: {
    ...rootPreview.parameters,
    controls: {
      ...(rootPreview.parameters?.controls ?? {}),
      disable: false,
      expanded: true,
    },
  },
  globalTypes: {
    ...(rootPreview.globalTypes ?? {}),
    capTheme: {
      name: 'Themes',
      description: 'Select the theme for all CAP stories',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        showName: true,
        dynamicTitle: true,
        items: [
          { value: 'default', title: 'Default' },
          { value: 'teams', title: 'CAP (Teams)' },
          { value: 'onedrive', title: 'CAP (OneDrive)' },
          { value: 'sharepoint', title: 'CAP (SharePoint)' },
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
