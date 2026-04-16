import { carouselContextDefaultValue as fluentCarouselContextDefaultValue } from '@fluentui/react-carousel';
import {
  type ContextSelector,
  createContext,
  useContextSelector,
} from '@fluentui/react-context-selector';
import type { CarouselContextValues } from './Carousel.types';

export const carouselContextDefaultValue: CarouselContextValues = {
  carousel: fluentCarouselContextDefaultValue,
  layout: 'inline',
};

const CarouselContext = createContext<CarouselContextValues | undefined>(
  undefined
);

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext = <T>(
  selector: ContextSelector<CarouselContextValues, T>
): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) =>
    selector(ctx)
  );
