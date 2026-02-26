import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";
import type { Button } from "@fluentui-contrib/react-cap-theme/react-button";

/**
 * Defines the structure of Header component slots for rendering different parts of the header.
 * @alpha
 */
export type HeaderSlots = {
	root: NonNullable<Slot<"header", "div">>;
	actions?: Slot<"div">;
	content: NonNullable<Slot<"div">>;
	expandButton?: Slot<typeof Button>;
};

/**
 * Defines available size options for Header component.
 * @alpha
 */
export type HeaderSize = "xlarge" | "large" | "medium" | "small";

/**
 * Props for the Header component.
 * @alpha
 */
export type HeaderProps = ComponentProps<Partial<HeaderSlots>> & {
	/**
	 * Horizontal alignment of the header content.
	 * @default 'start'
	 */
	alignment?: "start" | "center";
	/**
	 * Whether the header content can be collapsed or expanded.
	 * @default false
	 */
	collapsible?: boolean;
	/**
	 * Position of the expand/collapse button when collapsible is true.
	 * @default 'start'
	 */
	expandButtonPosition?: "start" | "end";
	/**
	 * Controls the visibility of the header content when the header is collapsible.
	 * @default true
	 */
	open?: boolean;
	/**
	 * Size variant of the header.
	 * @default 'xlarge'
	 */
	size?: HeaderSize;
};

/**
 * State used in rendering Header component, includes resolved props and slot configurations.
 * @alpha
 */
export type HeaderState = ComponentState<HeaderSlots> &
	Required<
		Pick<
			HeaderProps,
			| "alignment"
			| "collapsible"
			| "expandButtonPosition"
			| "open"
			| "size"
		>
	>;

/**
 * The supported events that will trigger open/close of the header.
 * @internal
 */
export type OpenHeaderEvents =
	| MouseEvent
	| TouchEvent
	| React.KeyboardEvent<HTMLElement>
	| React.MouseEvent<HTMLElement>;

/**
 * Context values provided to Header child components.
 * @alpha
 */
export type HeaderContextValues = Pick<
	HeaderState,
	"alignment" | "collapsible" | "open" | "size"
>;
