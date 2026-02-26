import type { DrawerHeaderNavigationProps } from "@fluentui/react-drawer";
import {
	renderDrawerHeaderNavigation_unstable,
	useDrawerHeaderNavigation_unstable,
} from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawerHeaderNavigationStyles } from "./useDrawerHeaderNavigationStyles.styles";

/**
 * DrawerHeaderNavigation provides a header navigation area for the Drawer.
 *
 * @example
 * ```tsx
 * <DrawerHeaderNavigation>
 *   <Button
 *     aria-label="Back"
 *     appearance="subtle"
 *     icon={<ArrowLeftRegular />}
 *   />
 *   <Toolbar>
 *     <ToolbarButton
 *       aria-label="Reload content"
 *       appearance="subtle"
 *       icon={<ArrowClockwiseRegular />}
 *     />
 *     <ToolbarButton
 *       aria-label="Close panel"
 *       appearance="subtle"
 *       icon={<DismissRegular />}
 *       onClick={toggleDrawer}
 *     />
 *   </Toolbar>
 * </DrawerHeaderNavigation>
 * ```
 * @param props - The drawer header navigation component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer header navigation
 * @alpha
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> =
	forwardRef((props, ref) => {
		const state = useDrawerHeaderNavigation_unstable(props, ref);

		useDrawerHeaderNavigationStyles(state);

		return renderDrawerHeaderNavigation_unstable(state);
	});

DrawerHeaderNavigation.displayName = "DrawerHeaderNavigation";
