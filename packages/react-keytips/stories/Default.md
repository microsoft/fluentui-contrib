By default Keytips are shown for all target elements that have keytip attached via
`useKeytipRef`, except disabled elements.
When multiple Keytips start with the same character, typing that character will filter the visible keytips.
You can also use `positioning` to set an offset from the target element, or control [other positioning options](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--docs).

```tsx
export const DefaultStory = () => {
  const normalKeytip = useKeytipRef({
    keySequences: ['b1'],
    content: 'B1',
    onExecute,
  });

  const keytipWithOffset = useKeytipRef({
    keySequences: ['b4'],
    positioning: { offset: { crossAxis: -50, mainAxis: 5 } },
    content: 'B4',
    onExecute,
  });

  return (
    <>
      <Button ref={normalKeytip}>Normal Keytip</Button>
      <Button ref={keytipWithOffset}>Keytip with offset</Button>
    </>
  );
};
```
