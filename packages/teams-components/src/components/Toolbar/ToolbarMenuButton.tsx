import * as React from 'react';
import { MenuButton, MenuButtonProps } from '../MenuButton';
import { createStrictClass } from '../../strictStyles/createStrictClass';

export const toolbarMenuButtonClassNames = {
  root: 'tco-ToolbarMenuButton',
};

export type ToolbarMenuButtonProps = Omit<MenuButtonProps, 'className' | 'menuIcon'>;

const rootStrictClassName = createStrictClass(toolbarMenuButtonClassNames.root);

// TODO teams-components should reuse composition patterns
export const ToolbarMenuButton = React.forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  return (
    <MenuButton
      ref={ref}
      {...props}
      menuIcon={null}
      className={rootStrictClassName}
      data-appearance={props.appearance}
    />
  );
});
