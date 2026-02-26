import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import React from "react";

import { useTagAvatarContextValues } from "../Tag/useTagAvatarContextValues";
import type { InteractionTagPrimaryProps } from "./InteractionTagPrimary.types";
import { renderInteractionTagPrimary } from "./renderInteractionTagPrimary";
import { useInteractionTagPrimary } from "./useInteractionTagPrimary";
import { useInteractionTagPrimaryStyles } from "./useInteractionTagPrimaryStyles.styles";

/**
 * InteractionTagPrimary component - the primary interactive element of a tag.
 *
 * @example
 * ```tsx
 * <InteractionTagPrimary icon={<CalendarMonthRegular />}>
 *   May Meeting
 * </InteractionTagPrimary>
 * ```
 *
 * @param props - The primary interaction tag configuration and event handlers
 * @param ref - Reference to the primary interaction tag element
 * @returns The rendered primary interaction tag component
 * @alpha
 */
export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> =
	React.forwardRef((props, ref) => {
		const state = useInteractionTagPrimary(props, ref);

		useInteractionTagPrimaryStyles(state);

		useCustomStyleHook_unstable("useInteractionTagPrimaryStyles_unstable")(
			state,
		);

		return renderInteractionTagPrimary(
			state,
			useTagAvatarContextValues(state),
		);
	});

InteractionTagPrimary.displayName = "InteractionTagPrimary";
