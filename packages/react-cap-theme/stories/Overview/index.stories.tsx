import type { Meta } from '@storybook/react';

// Doc-only page: this CSF exists solely so the Getting Started MDX can attach to
// it via `<Meta of={...}>`. Attaching makes it render through Storybook's
// autodocs container (with the shared `.sbdocs-content` typography) so it
// matches the other docs pages. `!dev` keeps it out of the sidebar as a story.
const meta = {
  title: 'Packages/react-cap-theme/Getting Started',
  tags: ['!dev'],
} satisfies Meta;

export default meta;

// A CSF needs at least one story to be indexed (so the MDX `of={}` can resolve).
// This placeholder renders nothing and is hidden from the sidebar by `!dev`.
export const Doc = { render: () => null };
