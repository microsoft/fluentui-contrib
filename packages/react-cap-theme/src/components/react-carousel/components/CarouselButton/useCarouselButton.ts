import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useCarouselButton_unstable } from '@fluentui/react-carousel';
import { useButton } from '../../../react-button';
import type { Ref } from 'react';
import type {
  CarouselButtonProps,
  CarouselButtonState,
  FluentCarouselButtonProps,
} from './CarouselButton.types';

export const useCarouselButton = (
  props: CarouselButtonProps,
  ref: Ref<ARIAButtonElement>
): CarouselButtonState => {
  const fluentState = useCarouselButton_unstable(
    props as FluentCarouselButtonProps,
    ref
  );
  const { navType = 'next', ...buttonProps } = props;
  void navType;

  const buttonState = useButton(
    {
      icon: fluentState.icon,
      disabled: fluentState.disabled,
      tabIndex: fluentState.root.tabIndex,
      'aria-disabled': fluentState.root['aria-disabled'],
      appearance: 'subtle',
      ...buttonProps,
      onClick: fluentState.root.onClick as React.MouseEventHandler<
        HTMLButtonElement & HTMLAnchorElement
      >,
    },
    fluentState.root.ref as Ref<HTMLButtonElement>
  );

  return {
    ...fluentState,
    ...buttonState,
  };
};
