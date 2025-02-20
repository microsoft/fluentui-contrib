import * as React from 'react';
import {
  useDividerStyles_unstable,
  useDivider_unstable,
  renderDivider_unstable,
  mergeClasses,
  useMergedRefs,
} from '@fluentui/react-components';
import { useStyles } from './ToolbarDivider.styles';
import { useItemRegistration } from './itemRegistration';

export const toolbarDividerClassNames = {
  root: 'tco-ToolbarDivider',
};

export const ToolbarDivider = React.forwardRef<
  HTMLDivElement,
  Record<string, never>
>((props, ref) => {
  const styles = useStyles();
  const { ref: registerRef, styles: itemRegistrationStyles } =
    useItemRegistration({
      appearance: props.appearance,
      type: 'divider',
    });
  const state = useDivider_unstable(
    {
      ...props,
      vertical: true,
      className: mergeClasses(
        toolbarDividerClassNames.root,
        styles.root,
        itemRegistrationStyles.root.toString()
      ),
    },
    useMergedRefs(ref, registerRef)
  );
  useDividerStyles_unstable(state);

  return renderDivider_unstable(state);
});
