import * as React from 'react';
import {
  useDividerStyles_unstable,
  useDivider_unstable,
  renderDivider_unstable,
  mergeClasses,
} from '@fluentui/react-components';
import { useStyles } from './ToolbarDivider.styles';

export const toolbarDividerClassNames = {
  root: 'tco-ToolbarDivider',
};

export const ToolbarDivider = React.forwardRef<
  HTMLDivElement,
  Record<string, never>
>((props, ref) => {
  const styles = useStyles();
  const state = useDivider_unstable(
    {
      ...props,
      vertical: true,
      className: mergeClasses(toolbarDividerClassNames.root, styles.root),
    },
    ref
  );
  useDividerStyles_unstable(state);

  return renderDivider_unstable(state);
});
