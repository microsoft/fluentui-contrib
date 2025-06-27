export const validateTitleProps = (props: {
  title?: unknown;
  menuTitle?: unknown;
}) => {
  if (props.menuTitle && !props.title) {
    throw new Error(
      '@fluentui-contrib/teams-components::SplitButton with menuTitle present, title must also be provided'
    );
  }
};

export const validateSplitIconButton = (props: {
  title?: unknown;
  icon?: unknown;
  children?: unknown;
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

export const validateHasContent = (props: {
  children?: unknown;
  icon?: unknown;
}) => {
  if (!props.children && !props.icon) {
    throw new Error(
      '@fluentui-contrib/teams-components::SplitButton must have at least one of children or icon'
    );
  }
};
