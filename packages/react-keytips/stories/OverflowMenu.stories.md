Keytips with Overflow require `dynamic` prop to be passed with `useKeytipRef`. You can also register
a `persisted` keytip, that can be accessed from the top level as a shortcut. A shortcut to a normal Button
will trigger the Button, shortcut to a MenuButton will open a menu. In this example, firing `B` and `C`
will show this functionality.

```tsx
const subMenuRef = useKeytipRef<HTMLDivElement>({
  keySequences: ['a', 'b'],
  content: 'B',
  dynamic: true,
  persited: true,
  onExecute,
});
```
