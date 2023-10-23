# combinator-depth

Large amounts of nested combinators in a CSS rules can cause perf problems with selector matching and style
invalidation in browsers. Generally, the most performant way of applying CSS rules is to apply with either an
id or a CSS class directly on the affected DOM element.

## Incorrect

```tsx
import { makeStyles, Button, buttonClassNames } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    [`& .${buttonClassNames.root}`]: {
      color: 'red',
    },
  },
});

export function Component() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Button>Foo</Button>
    </div>
  );
}
```

## Correct

```tsx
import { makeStyles, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'red',
  },
});

export function Component() {
  const styles = useStyles();

  return (
    <div>
      <Button className={styles.root}>Foo</Button>
    </div>
  );
}
```
