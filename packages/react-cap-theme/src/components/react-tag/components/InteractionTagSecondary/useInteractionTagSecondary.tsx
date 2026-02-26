import { useInteractionTagSecondary_unstable } from "@fluentui/react-tags";
import {
	bundleIcon,
	DismissFilled,
	DismissRegular,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";
import type {
	InteractionTagSecondaryProps,
	InteractionTagSecondaryState,
} from "./InteractionTagSecondary.types";

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * Creates the state required to render InteractionTagSecondary component.
 *
 * @param props - Props from this instance of InteractionTagSecondary
 * @param ref - Reference to root HTMLElement of InteractionTagSecondary
 * @returns The InteractionTagSecondary state object
 * @alpha
 */
export const useInteractionTagSecondary = (
	props: InteractionTagSecondaryProps,
	ref: React.Ref<HTMLButtonElement>,
): InteractionTagSecondaryState => {
	const baseState = useInteractionTagSecondary_unstable(
		{
			...props,
			children: props.children || <DismissIcon />,
		},
		ref,
	);

	const state: InteractionTagSecondaryState = {
		...baseState,
	};

	return state;
};
