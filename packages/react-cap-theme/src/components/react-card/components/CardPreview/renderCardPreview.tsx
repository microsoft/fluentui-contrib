import { renderCardPreview_unstable } from "@fluentui/react-card";
import type { ReactElement } from "react";
import type { CardPreviewState } from "./CardPreview.types";

/**
 * Render the final JSX of CardPreview.
 * @param state - CardPreview state object.
 * @returns JSX element of CardPreview.
 * @alpha
 */
export const renderCardPreview = (state: CardPreviewState): ReactElement =>
	renderCardPreview_unstable(state);
