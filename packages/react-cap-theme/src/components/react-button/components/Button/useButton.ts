import { useButton_unstable as useBaseState } from '@fluentui/react-button';
import type {
  ButtonProps,
  ButtonState,
} from '../../../../customStyleHooks/react-button';
import { toBaseProps } from './Button.utils';

export const useButton = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): ButtonState => {
  const appearance = props.appearance ?? 'secondary';

  return {
    ...useBaseState(toBaseProps(props), ref),
    appearance,
  } as ButtonState;
};
