## Threaded Virtualization Investigation

This example reflects a navigation and hierarchy shape we want to support, but it also highlights API gaps in the current `TreeGrid` primitives.

### Navigation gaps

- The example needs story-level `onKeyDown` handlers for header traversal and entry or exit focus behavior.
- Tabster interception is acceptable here, but custom key routing for row navigation is a smell and suggests missing `TreeGrid` navigation extension points.
- The example needs its own focus registry and `scrollToItem` coordination for virtualization.

### Hierarchy and ARIA gaps

- The example sets structural ARIA such as `aria-level` and `aria-expanded` directly on rows.
- This happens because `TreeGridRow` currently couples hierarchical semantics to the rendered subtree pattern.
- Virtualized flattened trees still need the same semantics even when child rows are not rendered as a DOM subtree.

### Candidate areas to investigate

- A configurable navigation strategy for `TreeGrid` so examples do not have to reimplement row-to-row keyboard routing.
- Row classification metadata, such as header versus message versus input, so navigation and semantics can vary by row kind.
- Declarative row hierarchy metadata on `TreeGridRow` so consumers provide level and expandability state without manually setting ARIA.
- A first-class virtualization focus contract so consumers can resolve and focus items that are not currently mounted.

### Goal

Use this example as a reference for future `TreeGrid` API improvements, not as a signal that complex behavior should live permanently in story code.
