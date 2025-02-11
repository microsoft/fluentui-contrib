import * as React from 'react';
import {
  useButton_unstable,
  useButtonStyles_unstable,
  renderButton_unstable,
  type ButtonProps as ButtonPropsBase,
  Tooltip,
} from '@fluentui/react-components';
import { validateIconButton, validateMenuButton } from './validateProps';
import { type StrictCssClass, validateStrictClasses } from '../../strictStyles';
import { type StrictSlot } from '../../strictSlot';

export interface ButtonProps
  extends Pick<
    ButtonPropsBase,
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
  title?: StrictSlot;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (userProps, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      validateProps(userProps);
    }

    const { className, icon, title, ...restProps } = userProps;
    const props: ButtonPropsBase = {
      ...restProps,
      className: className?.toString(),
      iconPosition: 'before',
      icon,
    };

    let state = useButton_unstable(props, ref);
    state = useButtonStyles_unstable(state);

    const button = renderButton_unstable(state);

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
  validateMenuButton(props);
};
