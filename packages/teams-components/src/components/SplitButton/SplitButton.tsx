import * as React from 'react';
import { renderSplitButton_unstable } from './renderSplitButton';
import type { SplitButtonProps as SplitButtonPropsBase } from '@fluentui/react-components';
import {
  useSplitButton_unstable,
  useSplitButtonStyles_unstable,
  renderSplitButton_unstable as renderSplitButtonBase_unstable,
} from '@fluentui/react-components';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { StrictCssClass, validateStrictClasses } from '../../strictStyles';
import { StrictSlot } from '../../strictSlot';
import { ButtonStrictOverrides, validateMenuButton } from '../Button';
import { validateTitleProps, validateSplitIconButton } from './validateProps';

export interface SplitButtonProps
  extends Pick<
    SplitButtonPropsBase,
    'size' | 'disabled' | 'disabledFocusable'
  > {
  appearance?: 'transparent' | 'primary';
  className?: StrictCssClass<ButtonStrictOverrides>;
  icon?: StrictSlot;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: StrictSlot;
  menuTitle?: StrictSlot;
}

/**
 * SplitButtons are a grouping of two interactive surfaces where interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
 */
export const SplitButton = React.forwardRef<
  HTMLButtonElement,
  SplitButtonProps
>((props, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    validateProps(props);
  }

  const { className, icon, title, menuTitle, ...restProps } = props;
  const buttonProps = {
    ...restProps,
    className: className?.toString(),
    icon,
  } as SplitButtonPropsBase;
  const state = useSplitButton_unstable(buttonProps, ref);

  useSplitButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useSplitButtonStyles_unstable')(state);

  const titleProps = { title, menuTitle };

  return titleProps.title
    ? renderSplitButton_unstable(state, titleProps)
    : renderSplitButtonBase_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';

const validateProps = (props: SplitButtonProps) => {
  validateStrictClasses(props.className);
  validateSplitIconButton(props);
  validateMenuButton(props);
  validateTitleProps(props);
};
