import type {
	SearchBoxProps as BaseSearchBoxProps,
	SearchBoxSlots as BaseSearchBoxSlots,
	SearchBoxState as BaseSearchBoxState,
} from "@fluentui/react-search";
import type { ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slot configuration for the SearchBox component.
 * @alpha
 */
export type SearchBoxSlots = BaseSearchBoxSlots & {
	/**
	 * Separator element which is rendered between the input and dismiss.
	 */
	separator?: Slot<"span">;
};

/**
 * Properties for configuring the SearchBox component.
 * @alpha
 */
export type SearchBoxProps = Omit<BaseSearchBoxProps, "appearance"> & {
	/**
	 * The appearance of the search box.
	 *
	 * - 'outline' (default): Neutral border and background styling with rounded corners.
	 * - 'filled-inset': Applies an inset shadow effect with circular corners.
	 *
	 * @default outline
	 */
	appearance?: "outline" | "filled-inset";
};

/**
 * State used in rendering the SearchBox component.
 * @alpha
 */
export type SearchBoxState = Omit<
	BaseSearchBoxState,
	"components" | "appearance"
> &
	ComponentState<SearchBoxSlots> &
	Required<Pick<SearchBoxProps, "appearance">>;

export type { SearchBoxChangeEvent } from "@fluentui/react-search";
