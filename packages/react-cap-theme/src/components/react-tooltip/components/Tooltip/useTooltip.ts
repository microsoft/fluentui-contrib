import { useTooltip_unstable as useFluentTooltip_unstable } from '@fluentui/react-tooltip';
import type { TooltipProps, TooltipState } from './Tooltip.types';

export const useTooltip_unstable = (props: TooltipProps): TooltipState => {
  const { appearance, ...rest } = props;
  const extendedAppearance = appearance || 'normal';

  const fluentAppearance =
    extendedAppearance === 'brand' ? 'normal' : extendedAppearance;

  const baseState = useFluentTooltip_unstable({
    ...rest,
    appearance: fluentAppearance,
  });

  return {
    ...baseState,
    extendedAppearance,
  };
};
