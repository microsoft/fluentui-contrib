import { useCard_unstable } from "@fluentui/react-card";

import type { CardProps, CardState } from "./Card.types";

/**
 * Create the state required to render Card.
 * @param props - Props from this instance of Card
 * @param ref - Reference to root element of Card
 * @returns Card state
 * @alpha
 */
export const useCard = (
	props: CardProps,
	ref: React.Ref<HTMLDivElement>,
): CardState => useCard_unstable(props, ref);
