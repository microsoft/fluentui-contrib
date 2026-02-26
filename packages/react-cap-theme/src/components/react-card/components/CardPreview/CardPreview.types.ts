import type {
	CardPreviewProps as BaseProps,
	CardPreviewState as BaseState,
} from "@fluentui/react-card";

export type { CardPreviewSlots } from "@fluentui/react-card";

/**
 * CardPreview component props.
 * @alpha
 */
export type CardPreviewProps = BaseProps & {
	/**
	 * Layout of the content.
	 *
	 * - 'full' (default): Pushes out to align with the edges of the Card.
	 * - 'contained': Content stays within the Card's spacing.
	 *
	 * @default 'full'
	 */
	layout?: "full" | "contained";
};

/**
 * State used in rendering CardPreview.
 * @alpha
 */
export type CardPreviewState = BaseState &
	Required<Pick<CardPreviewProps, "layout">>;
