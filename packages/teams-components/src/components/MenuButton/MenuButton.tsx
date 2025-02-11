import * as React from 'react';
import {
  useMenuButton_unstable,
  useMenuButtonStyles_unstable,
  renderMenuButton_unstable,
  type MenuButtonProps as MenuButtonPropsBase,
  Tooltip,
} from '@fluentui/react-components';
import { validateIconButton } from '../Button';
import { type StrictCssClass, validateStrictClasses } from '../../strictStyles';
import { type StrictSlot } from '../../strictSlot';

export interface MenuButtonProps
  extends Pick<
    MenuButtonPropsBase,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'size'
    | 'children'
    | 'disabled'
    | 'disabledFocusable'
  > {
  appearance?: 'transparent' | 'primary';
  className?: StrictCssClass;
  icon?: StrictSlot;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tooltip?: StrictSlot;
}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (userProps, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      validateProps(userProps);
    }

    const { className, icon, tooltip, ...restProps } = userProps;
    const props: MenuButtonPropsBase = {
      ...restProps,
      className: className?.toString(),
      icon,
    };

    let state = useMenuButton_unstable(props, ref);
    state = useMenuButtonStyles_unstable(state);

    const button = renderMenuButton_unstable(state);

    if (tooltip) {
      return (
        <Tooltip content={tooltip} relationship="label">
          {button}
        </Tooltip>
      );
    }

    return button;
  }
);

const validateProps = (props: MenuButtonProps) => {
  validateStrictClasses(props.className);
  validateIconButton(props);
};
