import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import React from "react";

import type { CardHeaderProps } from "./CardHeader.types";
import { renderCardHeader } from "./renderCardHeader";
import { useCardHeader } from "./useCardHeader";
import { useCardHeaderStyles } from "./useCardHeaderStyles.styles";

/**
 * Component to render an image, text and an action in a Card component.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CardHeader
 *   header='App Name'
 *   description='By Microsoft'
 *   action={<Button appearance='transparent' aria-label='Button' icon={<AddFilled />} size='small' />}
 *   image={<Avatar image={{ role: 'presentation', src: DeveloperTeam }} shape='circular' size={32} />}
 * />
 * ```
 * @alpha
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> =
	React.forwardRef((props, ref) => {
		const state = useCardHeader(props, ref);
		useCardHeaderStyles(state);
		useCustomStyleHook_unstable("useCardHeaderStyles_unstable")(state);

		return renderCardHeader(state);
	});
