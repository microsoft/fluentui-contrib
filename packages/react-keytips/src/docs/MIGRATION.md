# Keytips Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from Fabric UI (v8)

- `KeytipLayer` -> `Keytips`

  - `keytipExitSequence` -> renamed to `exitSequence`, instead of `IKeytipTransitionKey[]`
    accepts a string value. Can be a single key or a combination of keys separated by "+".
  - `keytipStartSequence` -> renamed to `startSequence`, instead of `IKeytipTransitionKey[]`,
    accepts a string value (default: "alt+meta (alt+win on Windows)"). Can be a single key or a combination of keys separated by "+".
  - `keytipReturnSequence` -> renamed to `returnSequence`, instead of `IKeytipTransitionKey[]`,
    accepts a string value. Can be a single key or a combination of keys separated by "+".
  - `styles` - Not supported.
  - `componentRef` -> Not supported.

- `useKeytipRef`:
  - `offset` - Changed. Instead use [positioning.offset](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--docs#offset-value).
  - `styles` - Not supported.
  - `theme` - Not supported.
  - `disabled` - Not supported. `Keytip` won't appear for disabled target.
    `callOutProps` -> Not supported. Instead there are multiple props available, that has to be used individually: `positioning`, `visible`, `content`.
  - `hasDynamicChildren` and `hasMenu` - merged into `dynamic` prop. If `Keytip` triggers dynamic content: Menu, Modal, Tabs or any other item that
    that has keytips, set `dynamic` to `true`.
