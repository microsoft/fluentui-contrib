import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import type { CardProps } from "./Card.types";
import { renderCard } from "./renderCard";
import { useCard } from "./useCard";
import { useCardStyles } from "./useCardStyles.styles";

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardPreview logo={<ImageRegular />}>
 *     <img src={NewAppThumbnail} alt='Preview of the app' />
 *   </CardPreview>
 *   <CardHeader header='App Name' description='By Microsoft'/>
 *   <Caption1>Exciting new app.</Caption1>
 *   <CardFooter>Release: TBD</CardFooter>
 * </Card>
 * ```
 * @alpha
 */
export const Card: ForwardRefComponent<CardProps> = forwardRef((props, ref) => {
	const state = useCard(props, ref);

	// Fluent doesn't export the cardContextValue
	const cardContextValue = { selectableA11yProps: state.selectableA11yProps };

	useCardStyles(state);

	return renderCard(state, cardContextValue);
});

Card.displayName = "Card";
