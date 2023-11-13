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

```tsx
import { makeStyles, Button, buttonClassNames } from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  showIcon: {
    // ✅ certain pseudo classes do not count toward allowed depth
    ':hover': {
      [`& .${buttonClassNames.icon}`]
      opacity: 1,
    }

    ':active': {
      [`& .${buttonClassNames.icon}`]
      opacity: 1,
    }
  },

  hiddenIcon: {
    opacity: 0,
  }
});

export function Component() {
  const styles = useStyles();

  return (
    <div>
      <Button className={styles.root} icon={{ children: <SendRegular />, className: styles.hiddenIcon }}>Foo</Button>
    </div>
  );
}
```
