import { renderCarouselNav_unstable } from "@fluentui/react-carousel";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { CarouselNavProps } from "./CarouselNav.types";
import { useCarouselNav } from "./useCarouselNav";
import { useCarouselNavContextValues } from "./useCarouselNavContextValues";
import { useCarouselNavStyles } from "./useCarouselNavStyles.styles";

/**
 * Enhanced CarouselNav component that provides CAP-specific density and layout options.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { CarouselNav, CarouselNavButton } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <CarouselNav density="comfortable">
 *   {(index) => <CarouselNavButton key={index} />}
 * </CarouselNav>
 * ```
 *
 * @example
 * With brand appearance:
 * ```tsx
 * import { CarouselNav, CarouselNavButton } from '@fluentui-contrib/react-cap-theme/react-carousel';
 *
 * <CarouselNav appearance="brand" layout="stretch">
 *   {(index) => <CarouselNavButton key={index} />}
 * </CarouselNav>
 * ```
 *
 * @param props - The carousel navigation configuration
 * @param ref - Reference to the carousel navigation element
 * @returns The rendered carousel navigation component
 * @alpha
 */
export const CarouselNav: ForwardRefComponent<CarouselNavProps> =
	React.forwardRef((props, ref) => {
		const state = useCarouselNav(props, ref);
		const contextValues = useCarouselNavContextValues(state);

		useCarouselNavStyles(state);

		return renderCarouselNav_unstable(state, contextValues);
	});

CarouselNav.displayName = "CarouselNav";
