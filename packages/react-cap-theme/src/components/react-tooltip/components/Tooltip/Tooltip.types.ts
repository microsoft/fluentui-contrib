import type { PortalProps } from '@fluentui/react-portal';
import type {
  TooltipProps as BaseTooltipProps,
  TooltipState as BaseTooltipState,
  TooltipSlots,
  TooltipTriggerProps,
} from '@fluentui/react-tooltip';
import type { ComponentProps, TriggerProps } from '@fluentui/react-utilities';

export type TooltipProps = ComponentProps<TooltipSlots> &
  TriggerProps<TooltipTriggerProps> &
  Pick<PortalProps, 'mountNode'> &
  Omit<BaseTooltipProps, 'appearance' | 'withArrow'> & {
    appearance?: 'normal' | 'inverted' | 'brand';
  };

export type TooltipState = BaseTooltipState & {
  extendedAppearance: 'normal' | 'inverted' | 'brand';
};
