import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import type { CardPreviewProps, CardPreviewState } from "./CardPreview.types";
import { renderCardPreview } from "./renderCardPreview";
import { useCardPreview } from "./useCardPreview";
import { useCardPreviewStyles } from "./useCardPreviewStyles.styles";

/**
 * Component to render image previews of documents or articles in a Card component.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CardPreview logo={<ImageRegular />}>
 *   <img src={NewAppThumbnail} alt='Preview of the app' layout='contained' />
 * </CardPreview>
 * ```
 * @alpha
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = forwardRef(
	(props, ref) => {
		const state = useCardPreview(props, ref) as CardPreviewState;

		useCardPreviewStyles(state);

		return renderCardPreview(state);
	},
);

CardPreview.displayName = "CardPreview";
