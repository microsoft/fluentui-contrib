import * as React from 'react';
import {
  type ToggleButtonProps as ToggleButtonPropsBase,
  useToggleButtonStyles_unstable,
  useToggleButton_unstable,
  renderToggleButton_unstable,
  Tooltip,
} from '@fluentui/react-components';
import { validateStrictClasses, type StrictCssClass } from '../../strictStyles';
import type { StrictSlot } from '../../strictSlot';
import { validateIconButton, validateMenuButton } from '../Button';

export interface ToggleButtonProps
  extends Pick<
    ToggleButtonPropsBase,
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
  checked: boolean;
}

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((userProps, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    validateProps(userProps);
  }

  const { className, icon, tooltip, ...restProps } = userProps;
  const props: ToggleButtonPropsBase = {
    ...restProps,
    className: className?.toString(),
    iconPosition: 'before',
    icon,
  };

  let state = useToggleButton_unstable(props, ref);
  state = useToggleButtonStyles_unstable(state);

  const button = renderToggleButton_unstable(state);

  if (tooltip) {
    return (
      <Tooltip content={tooltip} relationship="label">
        {button}
      </Tooltip>
    );
  }

  return button;
});

const validateProps = (props: ToggleButtonProps) => {
  validateStrictClasses(props.className);
  validateIconButton(props);
  validateMenuButton(props);
};
