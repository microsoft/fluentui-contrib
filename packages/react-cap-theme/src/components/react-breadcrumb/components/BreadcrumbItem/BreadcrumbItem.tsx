import {
	renderBreadcrumbItem_unstable,
	useBreadcrumbItem_unstable,
} from "@fluentui/react-breadcrumb";
import type { BreadcrumbItemProps } from "@fluentui/react-breadcrumb";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useBreadcrumbItemStyles } from "./useBreadcrumbItemStyles.styles";

/**
 * BreadcrumbItem is an item in the `Breadcrumb` list.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#'>Home</BreadcrumbButton>
 *   </BreadcrumbItem>
 *   <BreadcrumbDivider />
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#/contact-us' current>Contact us</BreadcrumbButton>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 * ```
 * @alpha
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> =
	forwardRef((props, ref) => {
		const state = useBreadcrumbItem_unstable(props, ref);

		useBreadcrumbItemStyles(state);
		useCustomStyleHook_unstable("useBreadcrumbItemStyles_unstable")(state);

		return renderBreadcrumbItem_unstable(state);
	});

BreadcrumbItem.displayName = "BreadcrumbItem";
