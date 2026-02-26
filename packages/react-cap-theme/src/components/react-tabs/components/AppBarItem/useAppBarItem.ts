import { useTab_unstable } from "@fluentui/react-tabs";
import { slot } from "@fluentui/react-utilities";
import type { AppBarItemProps, AppBarItemState } from "./AppBarItem.types";

/**
 * Create the state required to render AppBarItem component.
 * @param props - Props from this instance of AppBarItem
 * @param ref - Reference to root HTMLElement of AppBarItem
 * @returns The AppBarItem state object
 * @alpha
 */
export const useAppBarItem = (
	props: AppBarItemProps,
	ref: React.Ref<HTMLElement>,
): AppBarItemState => {
	const baseState = useTab_unstable(props, ref);

	// Handle avatar slot - now accepts any component
	const avatarSlot = slot.optional(props.avatar, { elementType: "span" });

	// Omit vertical from baseState and add horizontal

	const { vertical, ...tabStateWithoutVertical } = baseState;

	return {
		...tabStateWithoutVertical,
		components: {
			root: "button",
			avatar: "span",
			content: "span",
			contentReservedSpace: "span",
		},
		avatar: avatarSlot,
		avatarOnly: Boolean(
			avatarSlot?.children && !baseState.content.children,
		),
		// Derive horizontal from vertical property (horizontal = !vertical)
		horizontal: !vertical,
	};
};
