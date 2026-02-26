import { renderBreadcrumbDivider_unstable } from "@fluentui/react-breadcrumb";
import type { BreadcrumbDividerProps } from "@fluentui/react-breadcrumb";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useBreadcrumbDivider } from "./useBreadcrumbDivider";
import { useBreadcrumbDividerStyles } from "./useBreadcrumbDividerStyles.styles";

/**
 * A divider to separate each `BreadcrumbItem`.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#'>Home</BreadcrumbButton>
 *   </BreadcrumbItem>
 *    <BreadcrumbDivider />
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#/contact-us' current>Contact us</BreadcrumbButton>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 * ```
 *
 * @alpha
 */
export const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps> =
	forwardRef((props, ref) => {
		const state = useBreadcrumbDivider(props, ref);

		useBreadcrumbDividerStyles(state);
		useCustomStyleHook_unstable("useBreadcrumbDividerStyles_unstable")(
			state,
		);

		return renderBreadcrumbDivider_unstable(state);
	});

BreadcrumbDivider.displayName = "BreadcrumbDivider";
