/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type {
	AppBarItemInternalSlots,
	AppBarItemState,
} from "./AppBarItem.types";

/**
 * Render the final JSX of AppBarItem component.
 * @param state - The current AppBarItem state
 * @returns The rendered AppBarItem JSX element
 * @alpha
 */
export const renderAppBarItem = (state: AppBarItemState): JSX.Element => {
	assertSlots<AppBarItemInternalSlots>(state);

	return (
		<state.root>
			{state.avatar && <state.avatar />}
			{!state.avatarOnly && <state.content />}
			{state.contentReservedSpace && <state.contentReservedSpace />}
		</state.root>
	);
};
