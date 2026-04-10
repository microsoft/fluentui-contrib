import { Button, MenuButton } from '@fluentui/react-button';
import {
  getIntrinsicElementProps,
  useId,
  slot,
} from '@fluentui/react-utilities';
import type * as React from 'react';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';

export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): SplitButtonState => {
  const {
    appearance = 'secondary',
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    menuButton,
    menuIcon,
    primaryActionButton,
    size = 'medium',
  } = props;

  const baseId = useId('splitButton-');

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      appearance: appearance as any,
      disabled,
      disabledFocusable,
      menuIcon,
      size,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });

  const primaryActionButtonShorthand = slot.optional(primaryActionButton, {
    defaultProps: {
      appearance: appearance as any,
      children,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
      id: baseId + '__primaryActionButton',
      size,
    },
    renderByDefault: true,
    elementType: Button,
  });

  if (
    menuButtonShorthand &&
    primaryActionButtonShorthand &&
    !menuButtonShorthand['aria-label'] &&
    !menuButtonShorthand['aria-labelledby']
  ) {
    menuButtonShorthand['aria-labelledby'] = primaryActionButtonShorthand.id;
  }

  return {
    components: {
      root: 'div',
      menuButton: MenuButton,
      primaryActionButton: Button,
    },
    root: slot.always(getIntrinsicElementProps('div', { ref, ...props }), {
      elementType: 'div',
    }),
    primaryActionButton: primaryActionButtonShorthand,
    menuButton: menuButtonShorthand,
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape: 'rounded',
    size,
  };
};
