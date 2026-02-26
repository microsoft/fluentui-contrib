import {
	renderInlineDrawer_unstable,
	useDrawerContextValue,
	useInlineDrawer_unstable,
} from "@fluentui/react-drawer";
import type { InlineDrawerProps } from "@fluentui/react-drawer";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";
import { useInlineDrawerStyles } from "./useInlineDrawerStyles.styles";

/**
 * InlineDrawer is often used for navigation that is not dismissible. As it is on the same level as
 * the main surface, users can still interact with other UI elements.
 *
 * @example
 * ```tsx
 * <InlineDrawer>
 *   <DrawerHeader>
 *     <DrawerHeaderNavigation>
 *       <Button>Back</Button>
 *     </DrawerHeaderNavigation>
 *     <DrawerHeaderTitle>Title</DrawerHeaderTitle>
 *   </DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>Footer</DrawerFooter>
 * </InlineDrawer>
 * ```
 * @param props - The inline drawer component props
 * @param ref - React ref for the root element
 * @returns JSX.Element representing the rendered inline drawer
 * @alpha
 */
export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = forwardRef(
	(props, ref) => {
		const state = useInlineDrawer_unstable(props, ref);
		const contextValue = useDrawerContextValue();

		useInlineDrawerStyles(state);

		return renderInlineDrawer_unstable(state, contextValue);
	},
);

InlineDrawer.displayName = "InlineDrawer";
