import { useBreadcrumbButton_unstable } from "@fluentui/react-breadcrumb";
import type {
	BreadcrumbButtonProps,
	BreadcrumbButtonState,
} from "@fluentui/react-breadcrumb";
import { useButton } from "@fluentui-contrib/react-cap-theme/react-button";

/**
 * Create the state required to style and render the BreadcrumbButton.
 * @param props - Props of the BreadcrumbButton
 * @param ref - Reference to the root button
 * @returns The BreadcrumbButton state object
 * @alpha
 */
export const useBreadcrumbButton = (
	props: BreadcrumbButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): BreadcrumbButtonState => {
	const { root, ...baseState } = useBreadcrumbButton_unstable(props, ref);
	const buttonState = useButton(
		{
			...baseState,
			...root,
		},
		ref,
	);

	return {
		...buttonState,
		appearance: baseState.appearance,
		current: baseState.current,
	};
};
