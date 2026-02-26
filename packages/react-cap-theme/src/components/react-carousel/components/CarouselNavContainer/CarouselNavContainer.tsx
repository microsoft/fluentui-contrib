import type { CarouselNavContainerProps } from "@fluentui/react-carousel";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderCarouselNavContainer } from "./renderCarouselNavContainer";
import { useCarouselNavContainer } from "./useCarouselNavContainer";
import { useCarouselNavContainerStyles } from "./useCarouselNavContainerStyles.styles";

/**
 * Enhanced CarouselNavContainer component that provides CAP-specific layout options.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { CarouselNavContainer, CarouselNav, CarouselNavButton } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <CarouselNavContainer layout="inline">
 *   <CarouselNav>{(index) => <CarouselNavButton key={index} />}</CarouselNav>
 * </CarouselNavContainer>
 * ```
 *
 * @example
 * With expanded layout and autoplay:
 * ```tsx
 * import { CarouselNavContainer, CarouselNav, CarouselNavButton } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <CarouselNavContainer
 *   layout="inline-expanded"
 *   autoplayTooltip={{ content: 'Autoplay', relationship: 'label' }}
 * >
 *   <CarouselNav>{(index) => <CarouselNavButton key={index} />}</CarouselNav>
 * </CarouselNavContainer>
 * ```
 *
 * @param props - The carousel navigation container configuration
 * @param ref - Reference to the carousel navigation container element
 * @returns The rendered carousel navigation container component
 * @alpha
 */
export const CarouselNavContainer: ForwardRefComponent<CarouselNavContainerProps> =
	React.forwardRef((props, ref) => {
		const state = useCarouselNavContainer(props, ref);
		useCarouselNavContainerStyles(state);

		return renderCarouselNavContainer(state);
	});

CarouselNavContainer.displayName = "CarouselNavContainer";
