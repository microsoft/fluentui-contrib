import * as React from 'react';
import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { CapFoundations } from '@fluentui-contrib/cap-foundations-core';

// Reconfigure the bootstrap runtime to point at staticDirs-served theme files.
CapFoundations.configure({ basePath: '/themes' });

// ─────────────────────────────────────────────────────────────────────────────
// Theme CSS loader
// Inserts / updates a single <link> element so only one theme file is active.
// ─────────────────────────────────────────────────────────────────────────────
const THEME_LINK_ID = 'cap-foundations-story-theme';

function loadThemeCSS(theme: string, mode: string): void {
  if (typeof document === 'undefined') return;
  const href = `/themes/${theme}-${mode}.css`;
  const existing = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
  if (existing) {
    existing.href = href;
  } else {
    const link = document.createElement('link');
    link.id = THEME_LINK_ID;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Decorator — applies theme + mode globals to the document and the story root
// ─────────────────────────────────────────────────────────────────────────────
const withTheme: Decorator = (Story, context): React.ReactElement => {
  const mode: 'light' | 'dark' = context.globals['mode'] ?? 'light';
  const theme: string = context.globals['theme'] ?? 'default';

  useEffect(() => {
    loadThemeCSS(theme, mode);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;
  }, [theme, mode]);

  return (
    <div data-theme={theme} data-mode={mode} style={{ padding: '1rem' }}>
      <Story />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Preview
// ─────────────────────────────────────────────────────────────────────────────
const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Cap Foundations theme',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [{ value: 'default', title: 'Default' }],
        dynamicTitle: true,
      },
    },
    mode: {
      name: 'Mode',
      description: 'Light / Dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    viewMode: 'docs',
    controls: {
      disable: false,
      expanded: true,
    },
    docs: {
      codePanel: true,
    },
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
};

export default preview;
