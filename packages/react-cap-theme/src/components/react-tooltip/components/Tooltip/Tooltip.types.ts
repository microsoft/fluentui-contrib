import type {
  TooltipProps as BaseTooltipProps,
  TooltipState as BaseTooltipState,
} from '@fluentui/react-tooltip';

export type TooltipProps = BaseTooltipProps & {
  appearance?: 'normal' | 'inverted' | 'brand';
};

export type TooltipState = BaseTooltipState & {
  extendedAppearance: 'normal' | 'inverted' | 'brand';
};
