import { useTabList_unstable } from "@fluentui/react-tabs";
import type { AppBarProps, AppBarState } from "./AppBar.types";

/**
 * Create the state required to render AppBar component.
 * @param props - Props from this instance of AppBar
 * @param ref - Reference to root HTMLElement of AppBar
 * @returns The AppBar state object
 * @alpha
 */
export const useAppBar = (
	props: AppBarProps,
	ref: React.Ref<HTMLElement>,
): AppBarState => {
	const {
		onItemSelect: onTabSelect,
		density = "comfortable",
		horizontal = false,
		...rest
	} = props;
	const tabListState = useTabList_unstable(
		{
			...rest,
			size: "large",
			vertical: !horizontal, // Convert horizontal prop to vertical for TabList
			onTabSelect,
		},
		ref,
	);

	// Create AppBarState by omitting vertical and adding horizontal

	const { vertical, ...appBarState } = tabListState;
	return {
		...appBarState,
		density,
		horizontal,
	};
};
