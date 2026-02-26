import {
	renderOverlayDrawer_unstable,
	useDrawerContextValue,
	useOverlayDrawer_unstable,
} from "@fluentui/react-drawer";
import type { OverlayDrawerProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useOverlayDrawerStyles } from "./useOverlayDrawerStyles.styles";

/**
 * OverlayDrawer contains supplementary content and are used for complex creation, edit, or management experiences.
 *
 * @example
 * ```tsx
 * <OverlayDrawer>
 *   <DrawerHeader>
 *     <DrawerHeaderNavigation>
 *       <Button>Back</Button>
 *     </DrawerHeaderNavigation>
 *     <DrawerHeaderTitle>Title</DrawerHeaderTitle>
 *   </DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>Footer</DrawerFooter>
 * </OverlayDrawer>
 * ```
 * @param props - The overlay drawer component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered overlay drawer
 * @alpha
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> =
	forwardRef((props, ref) => {
		const state = useOverlayDrawer_unstable(props, ref);
		const contextValue = useDrawerContextValue();

		useOverlayDrawerStyles(state);

		return renderOverlayDrawer_unstable(state, contextValue);
	});

OverlayDrawer.displayName = "OverlayDrawer";
