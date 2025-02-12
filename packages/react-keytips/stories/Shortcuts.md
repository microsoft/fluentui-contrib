Keytips with `Overflow` and `Menu` components offer special options:

`isShortcut` - Enables shortcut behavior for the Keytip, allowing it to be triggered directly from the menu top-level.
`hasMenu` - Indicates that the Keytip opens a submenu. If hasMenu is not provided, the Keytip will trigger `onExecute` directly instead of displaying a submenu.

In this example, firing `T`, `Y` and `R` will show this functionality.

```tsx
const subMenuRef = useKeytipRef<HTMLDivElement>({
  keySequences: ['y'],
  content: 'Y',
  hasMenu: true,
  isShortcut: true,
  onExecute,
});

const subMenuRefItem = useKeytipRef<HTMLDivElement>({
  keySequences: ['t'],
  content: 'T',
  isShortcut: true,
  onExecute,
});
```
