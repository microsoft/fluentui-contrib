import { useAvatarGroupPopover_unstable } from '@fluentui/react-avatar';
import { slot } from '@fluentui/react-utilities';
import { PopoverSurface } from '../../../react-popover';
import { Tooltip } from '../../../react-tooltip';
import type {
  AvatarGroupPopoverProps,
  AvatarGroupPopoverState,
} from './AvatarGroupPopover.types';

export const useAvatarGroupPopover = (
  props: AvatarGroupPopoverProps
): AvatarGroupPopoverState => {
  const { tooltip: tooltipProps, ...baseProps } = props;
  const state = useAvatarGroupPopover_unstable(baseProps);

  const popoverSurface = slot.always(props.popoverSurface, {
    defaultProps: {
      'aria-label': 'Overflow',
      tabIndex: 0,
    },
    elementType: PopoverSurface,
  });
  const tooltip = slot.always(tooltipProps, {
    defaultProps: {
      content: 'View more people.',
      relationship: 'label',
    },
    elementType: Tooltip,
  });

  return {
    ...state,
    components: {
      ...state.components,
      popoverSurface: PopoverSurface,
      tooltip: Tooltip,
    },
    popoverSurface,
    tooltip,
  };
};
