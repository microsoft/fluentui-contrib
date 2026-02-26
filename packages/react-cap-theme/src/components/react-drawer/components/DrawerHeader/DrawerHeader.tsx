import {
	renderDrawerHeader_unstable,
	useDrawerHeader_unstable,
} from "@fluentui/react-drawer";
import type { DrawerHeaderProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawerHeaderStyles } from "./useDrawerHeaderStyles.styles";

/**
 * DrawerHeader provides a structured header for the drawer component.
 *
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerHeaderNavigation>
 *     <Button
 *       aria-label="Back"
 *       appearance="subtle"
 *       icon={<ArrowLeftIcon />}
 *     />
 *   </DrawerHeaderNavigation>
 *   <DrawerHeaderTitle>Header Title</DrawerHeaderTitle>
 * </DrawerHeader>
 * ```
 * @param props - The drawer header component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer header
 * @alpha
 */
export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = forwardRef(
	(props, ref) => {
		const state = useDrawerHeader_unstable(props, ref);

		useDrawerHeaderStyles(state);

		return renderDrawerHeader_unstable(state);
	},
);

DrawerHeader.displayName = "DrawerHeader";
