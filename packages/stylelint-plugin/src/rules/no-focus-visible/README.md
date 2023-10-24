# no-focus-visible

Disallow the use of the `:focus-visible` pseudoselector. The [browser support](https://caniuse.com/?search=focus-visible)
of the pseudoselector does not match with the [browser support matrix of Fluent UI](https://react.fluentui.dev/?path=/docs/concepts-developer-browser-support-matrix--page).

## Incorrect

```ts
import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    ':focus-visible': {
      ...shorthands.border('2px', 'solid', 'red'),
    },
  },
});
```

## Correct

### Using createFocusOutlineStyles

```ts
import { makeStyles, shorthands, createFocusOutlineStyle } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    ...createFocusOutlineStyles({
      ...shorthands.border('2px', 'solid', 'red'),
    }),
  },
});
```

### Using createCustomFocusIndicatorStyle

```ts
import { makeStyles, shorthands, createCustomFocusIndicatorStyle } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline('2px', 'solid', 'red'),
    }),
  },
});
```
