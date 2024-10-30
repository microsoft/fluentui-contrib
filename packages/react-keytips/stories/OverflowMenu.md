Keytips with Overflow require `dynamic` prop to be passed with `useKeytipRef`. You can also register
a `shortcut` keytip, that can be accessed from the top level. A shortcut to a normal Button
will trigger passed callback function, shortcut to a MenuButton will open a menu. In this example, firing `T` and `Y`
will show this functionality.

```tsx
const subMenuRef = useKeytipRef<HTMLDivElement>({
  keySequences: ['d', 'y'],
  content: 'Y',
  hasMenu: true,
  shortcut: true,
  onExecute,
});

const subMenuRefItem = useKeytipRef<HTMLDivElement>({
  keySequences: ['d', 't'],
  content: 'T',
  shortcut: true,
  onExecute,
});
```
