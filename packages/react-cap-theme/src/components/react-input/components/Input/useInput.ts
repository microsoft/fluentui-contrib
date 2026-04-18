import type { ForwardedRef } from 'react';
import { useInput_unstable } from '@fluentui/react-input';

import type {
  InputProps,
  InputState,
} from '../../../../customStyleHooks/react-input';

/**
 * Create the state required to render Input component.
 * @param props - Props from this instance of Input
 * @param ref - Reference to the HTMLInputElement (not root) of Input
 * @returns The Input state object
 * @alpha
 */
export const useInput = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
): InputState => {
  const { color, appearance, ...rest } = props;
  const baseState = useInput_unstable({ appearance, ...rest }, ref);

  return {
    ...baseState,
    color: color ?? 'brand',
    appearance: appearance ?? 'outline',
  };
};
