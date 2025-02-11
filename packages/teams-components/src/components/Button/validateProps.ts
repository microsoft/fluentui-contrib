/**
 * @throws Error if icon button is missing required props
 */
export const validateIconButton = (props: {
  icon?: unknown;
  children?: unknown;
  title?: unknown;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) => {
  if (
    !props.children &&
    props.icon &&
    !props.title &&
    !(props['aria-label'] || props['aria-labelledby'])
  ) {
    throw new Error(
      '@fluentui-contrib/teams-components::Icon button must have a title or aria label'
    );
  }
};

/**
 * Infers a Menu being used by detecting `aria-haspopup` of the MenuTrigger
 * @throws Error if a menu is used
 */
export const validateMenuButton = (props: unknown) => {
  if (typeof props === 'object' && props && 'aria-haspopup' in props) {
    throw new Error(
      '@fluentui-contrib/teams-components:: MenuButton should be used to open a Menu'
    );
  }
};
