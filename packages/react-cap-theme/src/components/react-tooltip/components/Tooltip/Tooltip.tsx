import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { renderTooltip_unstable } from '@fluentui/react-tooltip';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import type * as React from 'react';
import type { TooltipProps } from './Tooltip.types';
import { useTooltip_unstable } from './useTooltip';
import { useTooltipStyles_unstable } from './useTooltipStyles.styles';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const state = useTooltip_unstable(props);

  useTooltipStyles_unstable(state);
  useCustomStyleHook_unstable('useTooltipStyles_unstable')(state);

  return renderTooltip_unstable(state);
};

Tooltip.displayName = 'Tooltip';
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
