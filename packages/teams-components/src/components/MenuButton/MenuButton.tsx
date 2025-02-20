import * as React from 'react';
import {
  useMenuButton_unstable,
  useMenuButtonStyles_unstable,
  renderMenuButton_unstable,
  type MenuButtonProps as MenuButtonPropsBase,
  Tooltip,
} from '@fluentui/react-components';
import { ButtonProps, validateIconButton } from '../Button';
import { validateStrictClasses } from '../../strictStyles';

export const MenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (userProps, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      validateProps(userProps);
    }

    const { className, icon, title, ...restProps } = userProps;
    const props: MenuButtonPropsBase = {
      ...restProps,
      className: className?.toString(),
      icon,
    };

    let state = useMenuButton_unstable(props, ref);
    state = useMenuButtonStyles_unstable(state);

    const button = renderMenuButton_unstable(state);

    if (title) {
      return (
        <Tooltip content={title} relationship="label">
          {button}
        </Tooltip>
      );
    }

    return button;
  }
);

const validateProps = (props: ButtonProps) => {
  validateStrictClasses(props.className);
  validateIconButton(props);
};
