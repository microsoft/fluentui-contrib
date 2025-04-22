import * as React from 'react';
import {
  type ToggleButtonProps as ToggleButtonPropsBase,
  useToggleButtonStyles_unstable,
  useToggleButton_unstable,
  renderToggleButton_unstable,
  Tooltip,
} from '@fluentui/react-components';
import { validateStrictClasses } from '../../strictStyles';
import { validateAriaPressed } from './validateProps';
import { ButtonProps, validateIconButton, validateMenuButton } from '../Button';

export interface ToggleButtonProps extends ButtonProps {
  checked: boolean;
  'aria-pressed'?: undefined;
}

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((userProps, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    validateProps(userProps);
  }

  const { className, icon, title, ...restProps } = userProps;
  const props: ToggleButtonPropsBase = {
    ...restProps,
    className: className?.toString(),
    iconPosition: 'before',
    icon,
  };

  let state = useToggleButton_unstable(props, ref);
  if ('aria-pressed' in props) {
    state.root['aria-pressed'] = props['aria-pressed'];
  }
  state = useToggleButtonStyles_unstable(state);

  const button = renderToggleButton_unstable(state);

  if (title) {
    return (
      <Tooltip content={title} relationship="label">
        {button}
      </Tooltip>
    );
  }

  return button;
});

const validateProps = (props: ToggleButtonProps) => {
  validateStrictClasses(props.className);
  validateAriaPressed(props);
  validateIconButton(props);
  validateMenuButton(props);
};
