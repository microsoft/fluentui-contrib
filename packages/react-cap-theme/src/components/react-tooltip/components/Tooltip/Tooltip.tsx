import { renderTooltip_unstable } from '@fluentui/react-tooltip';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import type * as React from 'react';
import { useTooltipStyles_unstable } from '@fluentui/react-components';
import { useTooltip_unstable } from './useTooltip';
import type { TooltipProps } from '../../../../customStyleHooks/react-tooltip';
import { useTooltipStyles as useCAPTooltipStyles } from '../../../../customStyleHooks/react-tooltip';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const state = useTooltip_unstable(props);
  useTooltipStyles_unstable(state);
  useCAPTooltipStyles(state);

  return renderTooltip_unstable(state);
};

Tooltip.displayName = 'Tooltip';
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
