import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AddRegular,
  ArrowRightRegular,
  DeleteRegular,
  ArrowDownloadRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons';
import { Button } from '../../src';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Cap Foundations / Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **Button** is the primary interactive control for triggering actions. It supports four visual variants, three sizes, and can render as an anchor element for navigation.

## When to Use

- Trigger an action (submit, save, delete, confirm)
- Navigate to another page or section using \`as="a"\`
- Indicate the primary call-to-action with \`variant="primary"\`
- Confirm a destructive operation with \`variant="danger"\`

## Variants

| Variant | Use Case |
|---------|----------|
| \`default\` | Secondary actions, most common usage |
| \`primary\` | Main call-to-action — use one per section |
| \`danger\` | Destructive or irreversible actions |
| \`ghost\` | Low-priority actions, toolbar buttons, inline controls |

## Sizes

Heights match other controls for consistent alignment when placed side-by-side:

- **sm** (28px): Compact UI, toolbars, table row actions
- **md** (36px): Default size for most use cases
- **lg** (44px): Hero sections, prominent CTAs, touch targets

## Icons

Always use the \`icon\` and \`iconAfter\` props — never place icons directly in children:

\`\`\`tsx
// ✅ Leading icon
<Button icon={<AddRegular />}>New item</Button>

// ✅ Trailing icon
<Button iconAfter={<ArrowRightRegular />}>Next</Button>
\`\`\`

## Loading

Set \`loading={true}\` to show a spinner and disable interaction:

\`\`\`tsx
<Button variant="primary" loading>Saving…</Button>
\`\`\`

## Polymorphic

Use \`as="a"\` with a required \`href\` to render a link with button styling:

\`\`\`tsx
<Button as="a" href="/dashboard" variant="primary">Go to Dashboard</Button>
\`\`\`

## Accessibility

- Native \`<button>\` for click actions; keyboard activation (Enter / Space) is handled by the browser
- \`<a>\` variant adds Space key support and sets \`aria-disabled\` when disabled
- Focus ring visible via \`--focus-ring\` tokens
- \`loading\` sets \`aria-busy="true"\` and disables the control

## Usage

\`\`\`tsx
import { Button } from '@fluentui-contrib/cap-foundations-react';

<Button variant="primary" size="md" onClick={handleSubmit}>
  Submit
</Button>
\`\`\`
        `,
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size matching standard control heights (28 / 36 / 44px)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner and disables interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container',
    },
    icon: { control: false },
    iconAfter: { control: false },
    as: { control: false },
    href: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default — interactive controls
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'md',
  },
};

// ---------------------------------------------------------------------------
// Individual variants
// ---------------------------------------------------------------------------

export const Primary: Story = {
  args: { children: 'Save changes', variant: 'primary' },
  parameters: {
    docs: {
      description: { story: 'Use `primary` for the main call-to-action in a section.' },
    },
  },
};

export const Danger: Story = {
  render: (): React.ReactElement => (
    <Button variant="danger" icon={<DeleteRegular />}>Delete forever</Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `danger` for destructive or irreversible actions. Pair with a confirmation dialog.',
      },
    },
  },
};

export const Ghost: Story = {
  args: { children: 'More options', variant: 'ghost' },
  parameters: {
    docs: {
      description: {
        story:
          'Use `ghost` for low-priority actions that should not compete visually with the primary action.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// All variants side-by-side
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'All four variants at the default (md) size.' },
    },
  },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button size="sm">Small (28px)</Button>
      <Button size="md">Medium (36px)</Button>
      <Button size="lg">Large (44px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Heights (28 / 36 / 44px) match other interactive controls — inputs, selects, segmented controls — so they align perfectly in a row.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

export const WithLeadingIcon: Story = {
  render: (): React.ReactElement => (
    <Button variant="primary" icon={<AddRegular />}>New item</Button>
  ),
  parameters: {
    docs: {
      description: { story: 'Use the `icon` prop for a leading icon.' },
    },
  },
};

export const WithTrailingIcon: Story = {
  render: (): React.ReactElement => (
    <Button variant="default" iconAfter={<ArrowRightRegular />}>Next step</Button>
  ),
  parameters: {
    docs: {
      description: { story: 'Use the `iconAfter` prop for a trailing icon.' },
    },
  },
};

export const WithBothIcons: Story = {
  render: (): React.ReactElement => (
    <Button variant="default" icon={<ArrowDownloadRegular />} iconAfter={<CheckmarkRegular />}>
      Download
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Leading and trailing icons can be combined. The `gap` between icon and text is handled by the Button.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button size="sm" icon={<AddRegular />}>Small</Button>
      <Button size="md" icon={<AddRegular />}>Medium</Button>
      <Button size="lg" icon={<AddRegular />}>Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons scale proportionally with the button size — they inherit `font-size` from the button.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

export const Loading: Story = {
  args: {
    children: 'Saving…',
    variant: 'primary',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Setting `loading={true}` replaces the leading icon with a spinner, sets `aria-busy="true"`, and disables interaction.',
      },
    },
  },
};

export const LoadingVariants: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="default" loading>Default</Button>
      <Button variant="primary" loading>Primary</Button>
      <Button variant="danger" loading>Danger</Button>
      <Button variant="ghost" loading>Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Loading state across all variants.' },
    },
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="default" disabled>Default</Button>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="danger" disabled>Danger</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Disabled state uses the `*-disabled` tokens from each group.' },
    },
  },
};

// ---------------------------------------------------------------------------
// Polymorphic — renders as <a>
// ---------------------------------------------------------------------------

export const AsAnchor: Story = {
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button as="a" href="/dashboard" variant="primary">
        Go to Dashboard
      </Button>
      <Button as="a" href="/docs" variant="default" iconAfter={<ArrowRightRegular />}>
        Read the docs
      </Button>
      <Button as="a" href="/disabled" variant="ghost" disabled>
        Disabled link
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `as="a"` with a required `href` to render a navigation link with button styling. When `disabled`, the `href` is removed and `aria-disabled="true"` is set.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Full width
// ---------------------------------------------------------------------------

export const FullWidth: Story = {
  args: {
    children: 'Full-width button',
    variant: 'primary',
    fullWidth: true,
  },
  decorators: [
    (Story): React.ReactElement => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: { story: 'Set `fullWidth` to stretch the button to fill its container.' },
    },
  },
};

// ---------------------------------------------------------------------------
// Alignment test — controls placed side-by-side
// ---------------------------------------------------------------------------

export const AlignmentWithControls: Story = {
  name: 'Alignment with Other Controls',
  render: (): React.ReactElement => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <input
        placeholder="Search…"
        style={{
          height: 36,
          padding: '0 12px',
          border: '1px solid var(--base-border)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--softer-bg)',
          color: 'var(--softer-fg)',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-sans)',
          boxSizing: 'border-box',
        }}
      />
      <Button size="md" variant="default">Filter</Button>
      <Button size="md" variant="primary" icon={<AddRegular />}>New</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons at `md` size (36px) align perfectly with a native input at the same height.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// RTL
// ---------------------------------------------------------------------------

export const RTLSupport: Story = {
  render: (): React.ReactElement => (
    <div dir="rtl" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="default" icon={<ArrowRightRegular />}>
        الإجراء الافتراضي
      </Button>
      <Button variant="primary" iconAfter={<ArrowRightRegular />}>
        التالي
      </Button>
      <Button variant="ghost" icon={<AddRegular />}>
        إضافة عنصر
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'RTL layout: padding uses logical properties (`padding-inline`) so it mirrors correctly. The flex row direction reverses automatically.',
      },
    },
  },
};
