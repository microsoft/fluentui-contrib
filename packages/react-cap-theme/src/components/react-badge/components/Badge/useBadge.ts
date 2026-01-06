import type { ForwardedRef } from 'react';
import type { BadgeProps, BadgeState } from './Badge.types';
import { useBadge_unstable } from '@fluentui/react-badge';

/**
 * Create the state required to render Badge component.
 * @param props - Props from this instance of Badge
 * @param ref - Reference to the root HTMLDivElement of Badge
 * @returns The Badge state object
 * @alpha
 */
export const useBadge = (props: BadgeProps, ref: ForwardedRef<HTMLDivElement>): BadgeState => {
  const size = props.size ?? 'medium';
  return { ...useBadge_unstable(props, ref), size } as BadgeState;
};
