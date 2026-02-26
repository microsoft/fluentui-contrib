/** @jsx createElement */
/** @jsxRuntime classic */

import { ActiveDescendantContextProvider } from "@fluentui/react-aria";
import {
	ListboxProvider,
	type DropdownContextValues,
} from "@fluentui/react-combobox";
import { createElement } from "@fluentui/react-jsx-runtime";
import { Portal } from "@fluentui/react-portal";
import { assertSlots } from "@fluentui/react-utilities";
import type React from "react";

import type { DropdownState, DropdownSlots } from "./Dropdown.types";

/**
 * Render the final JSX of Dropdown component.
 * @param state - The current Dropdown state
 * @param contextValues - The context values from `useComboboxContextValues`
 * @returns The rendered JSX element
 * @alpha
 */
export const renderDropdown: React.FC<DropdownState> = (
	state,
	contextValues: DropdownContextValues,
) => {
	assertSlots<DropdownSlots>(state);

	return (
		<state.root>
			<ActiveDescendantContextProvider
				value={contextValues.activeDescendant}
			>
				<ListboxProvider value={contextValues.listbox}>
					<state.button>
						{state.contentBefore && <state.contentBefore />}
						{state.button.children}
						{state.expandIcon && <state.expandIcon />}
					</state.button>
					{state.clearButton && <state.clearButton />}
					{state.listbox &&
						(state.inlinePopup ? (
							<state.listbox />
						) : (
							<Portal mountNode={state.mountNode}>
								<state.listbox />
							</Portal>
						))}
				</ListboxProvider>
			</ActiveDescendantContextProvider>
		</state.root>
	);
};
