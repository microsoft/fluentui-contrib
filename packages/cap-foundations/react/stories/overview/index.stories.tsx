import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from '../../src';

// ---------------------------------------------------------------------------
// Demo component — shows useTheme in action
// ---------------------------------------------------------------------------
function ThemeSwitcherDemo(): React.ReactElement {
  const { resolvedMode, mode, toggleMode } = useTheme();
  return (
    <div style={{ fontFamily: 'var(--font-sans, sans-serif)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ margin: 0 }}>
        Current mode: <strong>{mode}</strong> → resolved: <strong>{resolvedMode}</strong>
      </p>
      <button
        onClick={toggleMode}
        style={{
          width: 'fit-content',
          padding: 'var(--space-2, 8px) var(--space-4, 16px)',
          borderRadius: 'var(--radius-md, 6px)',
          background: 'var(--controlPrimary-bg, #1a73e8)',
          color: 'var(--controlPrimary-text, #fff)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--text-base, 14px)',
        }}
      >
        Toggle mode (light → dark → auto)
      </button>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {(['base', 'softer', 'soft', 'strong', 'stronger'] as const).map(name => (
          <div
            key={name}
            style={{
              background: `var(--${name}-bg, #eee)`,
              color: `var(--${name}-text, #000)`,
              border: `1px solid var(--${name}-border, #ccc)`,
              padding: 'var(--space-3, 12px) var(--space-4, 16px)',
              borderRadius: 'var(--radius-md, 6px)',
              fontSize: 'var(--text-sm, 13px)',
              minWidth: '90px',
              textAlign: 'center',
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta = {
  title: 'Cap Foundations / Overview',
  decorators: [
    (Story): React.ReactElement => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`@fluentui-contrib/cap-foundations-react` — React theme provider built on Cap design system tokens. ' +
          'Wrap your app with `ThemeProvider` and consume the active theme via `useTheme`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TokenVerification: Story = {
  render: (): React.ReactElement => <ThemeSwitcherDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Surface tokens resolve when theme CSS is loaded (`nx run cap-foundations-core:build-themes` must have run first). ' +
          'Toggle mode to see dark/light switching.',
      },
    },
  },
};
