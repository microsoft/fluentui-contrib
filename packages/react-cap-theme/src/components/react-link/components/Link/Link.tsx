import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { LinkProps } from "./Link.types";
import { renderLink } from "./renderLink";
import { useLink } from "./useLink";
import { useLinkStyles } from "./useLinkStyles.styles";

/**
 * Link component for CAP Design System React UI.
 *
 * A Link component that provides consistent styling and behavior for navigational links
 * within CAP applications. It extends the base Fluent UI Link with CAP-specific
 * theming and design tokens.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Link href="https://example.com">Visit our website</Link>
 * ```
 *
 * @param props - The link configuration and event handlers
 * @returns The link component with CAP styling
 * @alpha
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef(
	(props, ref) => {
		const state = useLink(props, ref);

		useLinkStyles(state);

		useCustomStyleHook_unstable("useLinkStyles_unstable")(state);
		return renderLink(state);
	},
);

Link.displayName = "Link";
