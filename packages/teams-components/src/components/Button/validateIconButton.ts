/**
 * @throws Error if icon button is missing required props
 */
export const validateIconButton = (props: {
  icon?: unknown;
  children?: unknown;
  tooltip?: unknown;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) => {
  if (
    !props.children &&
    props.icon &&
    !props.tooltip &&
    !(props['aria-label'] || props['aria-labelledby'])
  ) {
    throw new Error(
      '@fluentui-contrib/teams-components::Icon button must have a tooltip or aria label'
    );
  }
};
