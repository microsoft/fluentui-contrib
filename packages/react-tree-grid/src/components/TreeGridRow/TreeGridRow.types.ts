export type TreeGridRowProps = JSX.IntrinsicElements['div'] & {
  // aria-level is required for screen readers to understand the nesting level of the row
  'aria-level': number | string;
};
