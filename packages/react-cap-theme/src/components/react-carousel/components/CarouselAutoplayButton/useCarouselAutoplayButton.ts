import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useCarouselAutoplayButton_unstable } from '@fluentui/react-carousel';
import { useToggleButton } from '../../../react-button';
import type {
  CarouselAutoplayButtonProps,
  CarouselAutoplayButtonState,
  FluentCarouselAutoplayButtonProps,
} from './CarouselAutoplayButton.types';

export const useCarouselAutoplayButton = (
  props: CarouselAutoplayButtonProps,
  ref: React.Ref<ARIAButtonElement>
): CarouselAutoplayButtonState => {
  const fluentState = useCarouselAutoplayButton_unstable(
    props as FluentCarouselAutoplayButtonProps,
    ref
  );
  const { onCheckedChange, checked, defaultChecked, ...buttonProps } = props;
  void checked;
  void defaultChecked;
  void onCheckedChange;

  return {
    ...useToggleButton(
      {
        icon: fluentState.icon,
        ...buttonProps,
        checked: fluentState.checked,
        onClick: fluentState.root.onClick as React.MouseEventHandler<
          HTMLAnchorElement & HTMLButtonElement
        >,
      },
      ref as React.Ref<HTMLButtonElement>
    ),
  };
};
