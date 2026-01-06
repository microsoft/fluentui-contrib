import { renderBadge_unstable } from '@fluentui/react-badge';
import type { BadgeState } from './Badge.types';

/**
 * Render the final JSX of Badge component.
 * @param state - The Badge state object
 * @returns The rendered Badge element
 * @alpha
 */
export const renderBadge: React.FC<BadgeState> = (state) =>
  renderBadge_unstable({ ...state, shape: 'circular' });
