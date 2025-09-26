import { ScrollToItemDynamicParams } from './imperativeScrolling.types';

export const scrollToItemDynamic = (
  params: ScrollToItemDynamicParams
): void => {
  const {
    index,
    getItemSize,
    totalSize,
    scrollViewRef,
    axis = 'vertical',
    reversed = false,
    behavior = 'auto',
  } = params;

  let itemDepth = 0;
  for (let i = 0; i < index; i++) {
    itemDepth += getItemSize(i);
  }

  if (axis === 'horizontal') {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        left: totalSize - itemDepth,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        left: itemDepth,
        behavior,
      });
    }
  } else {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        top: totalSize - itemDepth,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        top: itemDepth,
        behavior,
      });
    }
  }
};
