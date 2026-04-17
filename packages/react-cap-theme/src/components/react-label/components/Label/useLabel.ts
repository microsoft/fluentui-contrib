import { useLabel_unstable } from '@fluentui/react-label';
import { slot } from '@fluentui/react-utilities';
import type { Ref } from 'react';
import type {
  LabelState,
  LabelProps,
} from '../../../../customStyleHooks/react-label';

/**
 * Custom hook that creates and returns state for the Label component.
 * @param props - Label props
 * @param ref - React ref for the label element
 * @returns Label state
 * @alpha
 */
export const useLabel = (
  props: LabelProps,
  ref: Ref<HTMLLabelElement>
): LabelState => {
  const baseState = useLabel_unstable(props, ref);
  const iconElementType = 'span';
  const components: LabelState['components'] = {
    ...baseState.components,
    icon: iconElementType,
  };
  const icon = slot.optional(props.icon, { elementType: iconElementType });

  return {
    ...baseState,
    icon,
    components,
  };
};
