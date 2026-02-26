import { useCardPreview_unstable } from "@fluentui/react-card";

import type { CardPreviewProps, CardPreviewState } from "./CardPreview.types";

/**
 * Create the state required to render CardPreview.
 * @param props - Props from this instance of CardPreview
 * @param ref - Reference to root element of CardPreview
 * @returns CardPreview state
 * @alpha
 */
export const useCardPreview = (
	props: CardPreviewProps,
	ref: React.Ref<HTMLElement>,
): CardPreviewState => {
	const { layout } = props;

	const baseState = useCardPreview_unstable(props, ref);

	return {
		...baseState,
		layout: layout || "full",
	};
};
