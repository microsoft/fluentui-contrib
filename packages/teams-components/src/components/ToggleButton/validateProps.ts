export const validateAriaPressed = (props: {
  'aria-pressed'?: null | undefined;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) => {
  if (
    'aria-pressed' in props &&
    !(props['aria-label'] || props['aria-labelledby'])
  ) {
    throw new Error(
      '@fluentui-contrib/teams-components::ToggleButton with aria-pressed removed must have aria-label or aria-labelledby provided'
    );
  }
};
