The `@fluentui/react-cap-theme` package implements a `@fluentui/react-components` theme.

## Component Spec

A component's source code lives in its own folder, `./src/components/<ComponentName>`. Using `Button` as an example, these files should exist:

```ts
// file: ./src/components/Button/Button.styles.ts
import { type ButtonState } from '@fluentui/react-components';

export const useButtonStyles = makeStyles({
  root: {},
});

export function useButtonStylesHook(state: ButtonState): ButtonState {
  const styles = useButtonStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
```

The custom styles hook that is exported from `<ComponentName>.styles.ts` is wired up to the `FluentProvider` inside `CAPThemeProvider`.

If there are multiple pieces or slots to a component, each of those slots gets its own `.styles.ts` file. Each of these must be wired up to the CAPThemeProvider as well. For example:

- `components/Card/Card.styles.ts`
- `components/Card/CardHeader.styles.ts`
- `components/Card/CardFooter.styles.ts`
