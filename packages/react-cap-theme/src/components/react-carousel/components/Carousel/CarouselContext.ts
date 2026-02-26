import { carouselContextDefaultValue as fluentCarouselContextDefaultValue } from "@fluentui/react-carousel";
import {
	type ContextSelector,
	createContext,
	useContextSelector,
} from "@fluentui/react-context-selector";

import type { CarouselContextValues } from "./Carousel.types";

/**
 * Default context values for Carousel
 * @alpha
 */
export const carouselContextDefaultValue: CarouselContextValues = {
	carousel: fluentCarouselContextDefaultValue,
	layout: "inline",
};

const CarouselContext = createContext<CarouselContextValues | undefined>(
	undefined,
);

/**
 * Context provider for Carousel components
 * @alpha
 */
export const CarouselProvider = CarouselContext.Provider;

/**
 * Hook to access Carousel context values
 * @param selector - Function to select specific values from the context
 * @returns The selected context value
 * @alpha
 */
export const useCarouselContext = <T>(
	selector: ContextSelector<CarouselContextValues, T>,
): T =>
	useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) =>
		selector(ctx),
	);
