import {
	renderDrawer_unstable,
	useDrawerContextValue,
	type DrawerProps,
} from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawer } from "./useDrawer";
import { useDrawerStyles } from "./useDrawerStyles.styles";

/**
 * Drawer contains supplementary content and are used for complex creation, edit, or management experiences.
 *
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerHeader>
 *     <DrawerHeaderNavigation>
 *       <Button>Back</Button>
 *     </DrawerHeaderNavigation>
 *     <DrawerHeaderTitle>Title</DrawerHeaderTitle>
 *   </DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>Footer</DrawerFooter>
 * </Drawer>
 * ```
 * @param props - The drawer component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer
 * @alpha
 */
export const Drawer: ForwardRefComponent<DrawerProps> = forwardRef(
	(props, ref) => {
		const state = useDrawer(props, ref);
		const contextValue = useDrawerContextValue();

		useDrawerStyles(state);

		return renderDrawer_unstable(state, contextValue);
	},
);

Drawer.displayName = "Drawer";
