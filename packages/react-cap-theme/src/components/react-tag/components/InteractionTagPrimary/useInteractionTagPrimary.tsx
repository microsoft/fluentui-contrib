import { useInteractionTagPrimary_unstable } from "@fluentui/react-tags";
import { tagAvatarSizeMap } from "../Tag/useTag";
import type {
	InteractionTagPrimaryProps,
	InteractionTagPrimaryState,
} from "./InteractionTagPrimary.types";

/**
 * Creates the state required to render InteractionTagPrimary component.
 *
 * @param props - Props from this instance of InteractionTagPrimary
 * @param ref - Reference to root HTMLElement of InteractionTagPrimary
 * @returns The InteractionTagPrimary state object
 * @alpha
 */
export const useInteractionTagPrimary = (
	props: InteractionTagPrimaryProps,
	ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryState => {
	const baseState = useInteractionTagPrimary_unstable(props, ref);

	const state: InteractionTagPrimaryState = {
		...baseState,
		avatarSize: tagAvatarSizeMap[baseState.size],
	};

	return state;
};
