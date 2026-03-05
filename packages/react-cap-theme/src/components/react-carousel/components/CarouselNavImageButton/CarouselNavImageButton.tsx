import {
	type CarouselNavImageButtonProps,
	renderCarouselNavImageButton_unstable,
	useCarouselNavImageButton_unstable,
} from "@fluentui/react-carousel";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import type { ReactElement } from "react";
import * as React from "react";
import { useCarouselNavImageButtonStyles } from "./useCarouselNavImageButtonStyles.styles";

/**
 * Enhanced CarouselNavImageButton component that provides CAP-specific styling.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { CarouselNavImageButton } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <CarouselNavImageButton image={{ src: 'image.jpg', alt: 'Slide 1' }} />
 * ```
 *
 * @param props - The carousel navigation image button configuration
 * @param ref - Reference to the carousel navigation image button element
 * @returns The rendered carousel navigation image button component
 * @alpha
 */
export const CarouselNavImageButton: ForwardRefComponent<CarouselNavImageButtonProps> =
	React.forwardRef((props, ref): ReactElement => {
		const state = useCarouselNavImageButton_unstable(props, ref);
		useCarouselNavImageButtonStyles(state);
		return renderCarouselNavImageButton_unstable(state);
	});

CarouselNavImageButton.displayName = "CarouselNavImageButton";
