import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { CarouselProps } from "./Carousel.types";
import { renderCarousel } from "./renderCarousel";
import { useCarousel } from "./useCarousel";
import { useCarouselContextValues } from "./useCarouselContextValues";
import { useCarouselStyles } from "./useCarouselStyles.styles";

/**
 * Enhanced Carousel component that provides CAP-specific layout options and styling.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { Carousel, CarouselSlider, CarouselCard } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <Carousel layout="inline">
 *   <CarouselSlider>
 *     <CarouselCard>Content 1</CarouselCard>
 *     <CarouselCard>Content 2</CarouselCard>
 *   </CarouselSlider>
 * </Carousel>
 * ```
 *
 * @example
 * With expanded layout and navigation:
 * ```tsx
 * import {
 *   Carousel,
 *   CarouselSlider,
 *   CarouselCard,
 *   CarouselNavContainer,
 *   CarouselNav,
 *   CarouselNavButton
 * } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <Carousel layout="inline-expanded">
 *   <CarouselSlider>
 *     <CarouselCard>Content</CarouselCard>
 *   </CarouselSlider>
 *   <CarouselNavContainer>
 *     <CarouselNav>{(index) => <CarouselNavButton key={index} />}</CarouselNav>
 *   </CarouselNavContainer>
 * </Carousel>
 * ```
 *
 * @param props - The carousel configuration and content
 * @param ref - Reference to the carousel element
 * @returns The rendered carousel component
 * @alpha
 */
export const Carousel: ForwardRefComponent<CarouselProps> = React.forwardRef(
	(props, ref) => {
		const state = useCarousel(props, ref);
		const contextValues = useCarouselContextValues(state);

		useCarouselStyles(state);

		return renderCarousel(state, contextValues);
	},
);

Carousel.displayName = "Carousel";
