import * as React from 'react';
import { ToggleButton, type ToggleButtonProps } from '../ToggleButton';
import { createStrictClass } from '../../strictStyles/createStrictClass';
import { useItemRegistration } from './itemRegistration';
import { useMergedRefs } from '@fluentui/react-components';
import { mergeStrictClasses } from '../../strictStyles';

export const toolbarToggleButtonClassNames = {
  root: 'tco-ToolbarToggleButton',
};

export type ToolbarToggleButtonProps = Omit<ToggleButtonProps, 'className'>;

const rootStrictClassName = createStrictClass(
  toolbarToggleButtonClassNames.root
);

// TODO teams-components should reuse composition patterns
export const ToolbarToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const { ref: registerRef, styles } = useItemRegistration({
    appearance: props.appearance,
    type: 'button',
  });
  return (
    <ToggleButton
      ref={useMergedRefs(ref, registerRef)}
      {...props}
      className={mergeStrictClasses(rootStrictClassName, styles.root)}
      data-appearance={props.appearance}
    />
  );
});
