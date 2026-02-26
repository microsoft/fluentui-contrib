import {
	renderDrawerBody_unstable,
	useDrawerBody_unstable,
} from "@fluentui/react-drawer";
import type { DrawerBodyProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawerBodyStyles } from "./useDrawerBodyStyles.styles";

/**
 * DrawerBody provides with a container for the main content of a Drawer.
 *
 * @example
 * ```tsx
 * <DrawerBody>
 *   Content goes here
 * </DrawerBody>
 * ```
 * @param props - The drawer body component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer body
 * @alpha
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = forwardRef(
	(props, ref) => {
		const state = useDrawerBody_unstable(props, ref);

		useDrawerBodyStyles(state);

		return renderDrawerBody_unstable(state);
	},
);

DrawerBody.displayName = "DrawerBody";
