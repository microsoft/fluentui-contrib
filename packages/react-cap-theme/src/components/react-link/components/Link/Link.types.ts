import type {
	LinkProps as BaseLinkProps,
	LinkState as BaseLinkState,
} from "@fluentui/react-link";

/**
 * Props for the CAP Link component.
 *
 * The following property is added to BaseLinkProps:
 * - 'bold' enables rendering the link with semibold font weight (600) for enhanced styling in CAP applications.
 *
 * @alpha
 */
export type LinkProps = BaseLinkProps & {
	/**
	 * Whether the link should be bold.
	 * If set true, the link will be rendered with font weight 600 (tokens.fontWeightSemibold).
	 *
	 * @default false
	 */
	bold?: boolean;
};

/**
 * State object for the CAP Link component.
 *
 * The following property is added to BaseLinkState:
 * - 'bold' enables rendering the link with semibold font weight (600) for enhanced styling in CAP applications.
 *
 * @alpha
 */
export type LinkState = BaseLinkState & Required<Pick<LinkProps, "bold">>;

export type { LinkSlots } from "@fluentui/react-link";
