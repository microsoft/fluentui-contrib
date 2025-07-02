import * as React from 'react';
import { renderSplitButton_unstable } from './renderSplitButton';
import type { SplitButtonProps as SplitButtonPropsBase } from '@fluentui/react-components';
import {
  useSplitButton_unstable,
  useSplitButtonStyles_unstable,
  renderSplitButton_unstable as renderSplitButtonBase_unstable,
  MenuTrigger,
  MenuButtonProps,
} from '@fluentui/react-components';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { validateStrictClasses } from '../../strictStyles';
import { StrictSlot } from '../../strictSlot';
import { ButtonProps, validateMenuButton } from '../Button';
import {
  validateTitleProps,
  validateSplitIconButton,
  validateHasContent,
} from './validateProps';

export interface SplitButtonProps extends ButtonProps {
  menuTitle?: StrictSlot;
}

const useTeamsSplitButton = (
  props: SplitButtonProps,
  triggerProps: MenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const { className, icon, title, menuTitle, ...restProps } = props;
  const buttonProps = {
    ...restProps,
    ...triggerProps,
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
};

export const SplitButton = React.forwardRef<
  HTMLButtonElement,
  SplitButtonProps
>((props, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    validateProps(props);
  }

  return (
    <MenuTrigger>
      {(triggerProps: MenuButtonProps) =>
        useTeamsSplitButton(props, triggerProps, ref)
      }
    </MenuTrigger>
  );
}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';

const validateProps = (props: SplitButtonProps) => {
  validateHasContent(props);
  validateStrictClasses(props.className);
  validateSplitIconButton(props);
  validateMenuButton(props);
  validateTitleProps(props);
};
