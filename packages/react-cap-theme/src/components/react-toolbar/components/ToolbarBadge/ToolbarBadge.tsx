import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { renderBadge } from "@fluentui-contrib/react-cap-theme/react-badge";
import * as React from "react";

import type { ToolbarBadgeProps } from "./ToolbarBadge.types";
import { useToolbarBadge } from "./useToolbarBadge";
import { useToolbarBadgeStyles } from "./useToolbarBadgeStyles.styles";

/**
 * A CAP-styled badge component optimized for toolbar usage.
 * @example
 * ```tsx
 * <ToolbarBadge appearance="filled">5</ToolbarBadge>
 * ```
 * @param props - The badge component props
 * @param ref - React ref for the badge element
 * @returns JSX.Element representing the rendered badge
 * @alpha
 */
export const ToolbarBadge: ForwardRefComponent<ToolbarBadgeProps> =
	React.forwardRef((props, ref) => {
		const state = useToolbarBadge(props, ref);

		useToolbarBadgeStyles(state);

		return renderBadge(state);
	});

ToolbarBadge.displayName = "ToolbarBadge";
