import * as React from 'react';
import { MenuButton, MenuButtonProps } from '../MenuButton';
import { createStrictClass } from '../../strictStyles/createStrictClass';
import { useItemRegistration } from './itemRegistration';
import { useMergedRefs } from '@fluentui/react-components';
import { mergeStrictClasses } from '../../strictStyles';

export const toolbarMenuButtonClassNames = {
  root: 'tco-ToolbarMenuButton',
};

export type ToolbarMenuButtonProps = Omit<
  MenuButtonProps,
  'className' | 'menuIcon'
>;

const rootStrictClassName = createStrictClass(toolbarMenuButtonClassNames.root);

// TODO teams-components should reuse composition patterns
export const ToolbarMenuButton = React.forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  const { ref: registerRef, styles } = useItemRegistration({
    appearance: props.appearance,
    type: 'button',
  });
  return (
    <MenuButton
      ref={useMergedRefs(ref, registerRef)}
      {...props}
      menuIcon={null}
      className={mergeStrictClasses(rootStrictClassName, styles.root)}
      data-appearance={props.appearance}
    />
  );
});
