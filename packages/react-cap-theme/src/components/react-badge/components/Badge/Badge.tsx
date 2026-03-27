import type { BadgeProps } from '@fluentui/react-badge';
import { renderBadge_unstable, useBadge_unstable } from '@fluentui/react-badge';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useBadgeStyles } from './useBadgeStyles.styles';

export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef(
  (props, ref) => {
    const state = useBadge_unstable(props, ref);
    useBadgeStyles(state);
    return renderBadge_unstable(state);
  }
);

Badge.displayName = 'Badge';
