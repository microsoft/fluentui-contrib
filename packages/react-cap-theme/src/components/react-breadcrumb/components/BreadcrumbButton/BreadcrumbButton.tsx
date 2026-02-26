import { renderBreadcrumbButton_unstable } from "@fluentui/react-breadcrumb";
import type { BreadcrumbButtonProps } from "@fluentui/react-breadcrumb";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useBreadcrumbButton } from "./useBreadcrumbButton";
import { useBreadcrumbButtonStyles } from "./useBreadcrumbButtonStyles.styles";

/**
 * BreadcrumbButton is a button to navigate through a hierarchy.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbButton href='#/contact-us' current>Contact us</BreadcrumbButton>
 * </BreadcrumbItem>
 * ```
 *
 * @alpha
 */
export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> =
	forwardRef((props, ref) => {
		const state = useBreadcrumbButton(props, ref);

		useBreadcrumbButtonStyles(state);
		useCustomStyleHook_unstable("useBreadcrumbButtonStyles_unstable")(
			state,
		);

		return renderBreadcrumbButton_unstable(state);
	});

BreadcrumbButton.displayName = "BreadcrumbButton";
