Keytips with `Overflow` and `Menu` components offer special options, that can be used:

`isShortcut` - a Keytip can be a shortcut, that can be accessed from the top overflow level. A shortcut to a normal Button will trigger it immediately,
if it's attached to a Menu, it will open a Menu, even if Keytip does not have a child Keytip to show.

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
