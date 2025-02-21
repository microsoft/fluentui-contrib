# combinator-depth

Large amounts of nested combinators in a CSS rules can cause perf problems with selector matching and style invalidation in browsers. Generally, the most performant way of applying CSS rules is to apply with either an id or a CSS class directly on the affected DOM element.

While exceptions can exist for 3rd party components that do not allow access to all the underlying DOM elmenents. This is **not the case for Fluent UI** as every single part of the DOM can be leveraged to directly apply styles.

## Why

Excessive usage of combinators has two negative consequences in Teams

- Hard to detect performance issues due to browser recalc
- Bundle size consequences of CSS code

### Browser recalc

How browser determines what styles to invalidate based on CSS selector is extremely complicated, and even simple selectors can cause recalcs of large parts of the DOM. Determining whether CSS is the cause of such issues is a hard and time-consuming process for event experts in perf and CSS.

We want to leverage lint exceptions to make sure that all combinators in the app are absolutely necessary.

### Atomic CSS

**Atomic CSS** is designed to create small, reusable, and independent class definitions that can be combined efficiently. However, using **nested combinators** (e.g., `.parent .child`, `ul > li:first-child`) can break this principle and introduce unnecessary complexity.

#### 🔴 Problems with Nested Combinators

1.  **Loss of Reusability**
    - Atomic CSS aims to keep styles modular and reusable across different components.
    - When styles are tied to a specific hierarchy (e.g., `.list li:first-child`, `.element .some-other-element`), they **can't be reused elsewhere** without bringing the entire parent structure.
    - A style with with multiple CSS properties will be expanded to different classes i.e.:
      ```ts
      const useStyles = makeStyles({
        button: {
          '& .some-element .other-element div': {
            padding: '10px',
            margin: '10px',
            fontSize: '10px',
          },
        },
      });
      ```
      Outputs following CSS (_notice 3 different rules_):
      ```css
      .fabcde .some-element .other-element div {
        padding: 10px;
      }
      .fabcde .some-element .other-element div {
        margin: 10px;
      }
      .fabcde .some-element .other-element div {
        font-size: 10px;
      }
      ```
2.  **Increased Specificity & Override Issues**
    - Nested combinators make styles more **specific**, meaning they require **more specific overrides** when changes are needed.
    - This leads to unnecessary specificity wars (`!important`, deeper selectors, or unwanted inheritance).
3.  **Performance Overhead**
    - Atomic CSS libraries (like Griffel, Tailwind, StyleX, or Stitches) optimize class names for performance.
    - Deeply nested selectors **force the browser to evaluate more complex rules**, which slows down rendering.
4.  **Difficult Debugging & Maintenance**
    - With Atomic CSS, debugging is easy because classes are directly assigned to elements.
    - Nested combinators make it harder to trace why certain styles apply (_or don’t_) because they depend on parent elements.

## Common errors

### Not using slots on Fluent UI components

> Check out documentation on Fluent UI slots here [Customizing Components with Slots](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--docs)

❌ You should never need to use combinators to target DOM in Fluent UI components

```ts
// component.styles.ts
const useStyles = makeStyles({
  button: {
    "& svg": {
      fontSize: "14px".
    }
  }
});

// component.tsx
function App() {
  const styles = useStyles();

  return <Button className={styles.button}>Button</Button>
}
```

✅ Apply them to the slot instead

```ts
// component.styles.ts
const useStyles = makeStyles({
  icon: {
    fontSize: "14px".
  }
});


// component.tsx
function App() {
  const styles = useStyles();

  return <Button icon={{ className: styles.icon }}>Button</Button>
}
```

### Not allowing `className` overrides on reusable components

When creating components that can be reused - ensure that `className` prop exists for style overrides. Additionally if you are reusing components within TMP - prefer to add this API rather than relying on selectors.

By using combinators you run the risk of style breaks when the component you are using updates its DOM, since there is no that would validate that your CSS selector still works apart from screenshot testing.

❌

```ts
// component.styles.ts
const useStyles = makeStyles({
  cardConfirmButton: {
    '& div button': {
      marginLeft: '4px',
    },
  },
});

// component.tsx
const Component = () => {
  const styles = useStyles();

  return (
    <div className={styles.cardConfirmButton}>
      <Card />
    </div>
  );
};

const Card = () => {
  // 👇 If this div was replaced by another DOM element - parent styles are broken
  return (
    <div>
      <Button>Confirm</Button>
    </div>
  );
};
```

✅

```ts
// component.styles.ts
const useStyles = makeStyles({
  cardConfirmButton: {
    marginLeft: '4px',
  },
});

// component.tsx
const Component = () => {
  const styles = useStyles();

  return (
    <div>
      <Card confirmButtonclassName={styles.cardConfirmButton} />
    </div>
  );
};

const Card = (props: { confirmButtonclassName?: string }) => {
  return (
    <div>
      <Button className={props.confirmButtonClassName}>Confirm</Button>
    </div>
  );
};
```
