import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import type { CardFooterProps } from "./CardFooter.types";
import { renderCardFooter } from "./renderCardFooter";
import { useCardFooter } from "./useCardFooter";
import { useCardFooterStyles } from "./useCardFooterStyles.styles";

/**
 * Component to render Button actions in a Card component.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CardFooter action={<Button appearance='transparent' aria-label='Button' icon={<MoreHorizontalRegular />} size='small' />}>
 *   <Button icon={<ShareRegular />}>Share</Button>
 * </CardFooter>
 * ```
 * @alpha
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = forwardRef(
	(props, ref) => {
		const state = useCardFooter(props, ref);

		useCardFooterStyles(state);
		useCustomStyleHook_unstable("useCardFooterStyles_unstable")(state);

		return renderCardFooter(state);
	},
);

CardFooter.displayName = "CardFooter";
