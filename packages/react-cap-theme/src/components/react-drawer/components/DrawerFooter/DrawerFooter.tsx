import {
	renderDrawerFooter_unstable,
	useDrawerFooter_unstable,
} from "@fluentui/react-drawer";
import type { DrawerFooterProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawerFooterStyles } from "./useDrawerFooterStyles.styles";

/**
 * DrawerFooter provides a structured footer for the drawer component.
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button>Cancel</Button>
 *   <Button appearance='primary'>Save</Button>
 * </DrawerFooter>
 * ```
 * @param props - The drawer footer component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer footer
 * @alpha
 */
export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = forwardRef(
	(props, ref) => {
		const state = useDrawerFooter_unstable(props, ref);

		useDrawerFooterStyles(state);

		return renderDrawerFooter_unstable(state);
	},
);

DrawerFooter.displayName = "DrawerFooter";
