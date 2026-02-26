import {
	renderDrawerHeaderTitle_unstable,
	useDrawerHeaderTitle_unstable,
} from "@fluentui/react-drawer";
import type { DrawerHeaderTitleProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useDrawerHeaderTitleStyles } from "./useDrawerHeaderTitleStyles.styles";

/**
 * DrawerHeader provides a structured header for the drawer component.
 *
 * @example
 * ```tsx
 * <DrawerHeaderTitle action={
 *   <Button
 *     appearance='subtle'
 *     aria-label='Close'
 *     icon={<DismissRegular />}
 *     onClick={closeDrawer}
 *   />
 * }>
 *   Title
 * </DrawerHeaderTitle>
 * ```
 * @param props - The drawer header title component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered drawer header title
 * @alpha
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> =
	forwardRef((props, ref) => {
		const state = useDrawerHeaderTitle_unstable(props, ref);

		useDrawerHeaderTitleStyles(state);

		return renderDrawerHeaderTitle_unstable(state);
	});

DrawerHeaderTitle.displayName = "DrawerHeaderTitle";
