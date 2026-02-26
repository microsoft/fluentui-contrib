import type { CarouselNavContainerState as FluentCarouselNavButtonState } from "@fluentui/react-carousel";
import type { CarouselState } from "../Carousel/Carousel.types";

/**
 * State used by the CarouselNavContainer component
 * @alpha
 */
export type CarouselNavContainerState = Omit<
	FluentCarouselNavButtonState,
	"layout"
> &
	Pick<CarouselState, "layout"> & {
		/**
		 * The underlying Fluent UI layout value that gets passed to the base component.
		 * This is computed from the CAP-specific layout prop and handles the mapping
		 * from CAP layouts (like 'inline-expanded') to Fluent UI layouts (like 'overlay-expanded').
		 */
		baseLayout: FluentCarouselNavButtonState["layout"];
	};
