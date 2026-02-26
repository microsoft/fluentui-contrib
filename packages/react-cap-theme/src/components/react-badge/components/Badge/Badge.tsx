import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { BadgeProps } from "./Badge.types";
import { renderBadge } from "./renderBadge";
import { useBadge } from "./useBadge";
import { useBadgeStyles } from "./useBadgeStyles.styles";

/**
 * A badge is a visual decoration for UI elements.
 *
 * @example
 * ```tsx
 * <Badge>
 *  Badge
 * </Badge>
 * ```
 *
 * @alpha
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef(
	(props, ref) => {
		const state = useBadge(props, ref);
		useBadgeStyles(state);
		return renderBadge(state);
	},
);
