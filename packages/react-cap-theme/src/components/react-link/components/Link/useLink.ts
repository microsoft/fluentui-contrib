import { useLink_unstable as useBaseLink } from "@fluentui/react-link";

import type { LinkProps, LinkState } from "./Link.types";

/**
 * Hook that manages state for the CAP Link component.
 *
 * @param props - The props passed to the Link component
 * @param ref - The forwarded ref for the Link component
 * @returns The complete state object for the Link component
 * @alpha
 */
export const useLink = (
	props: LinkProps,
	ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>,
): LinkState => {
	const bold = props.bold ?? false;

	return {
		...useBaseLink(props, ref),
		bold,
	};
};
