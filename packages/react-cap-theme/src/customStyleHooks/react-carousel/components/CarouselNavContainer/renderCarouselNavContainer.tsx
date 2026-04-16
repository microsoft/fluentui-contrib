/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import type {
  CarouselNavContainerSlots,
  CarouselNavContainerState,
} from './CarouselNavContainer.types';

export const renderCarouselNavContainer = (
  state: CarouselNavContainerState
): JSXElement => {
  assertSlots<CarouselNavContainerSlots>(state);

  return (
    <state.root>
      {!state.autoplayTooltip && state.autoplay && <state.autoplay />}
      {state.autoplayTooltip && state.autoplay && (
        <state.autoplayTooltip>
          <state.autoplay />
        </state.autoplayTooltip>
      )}
      {!state.prevTooltip && state.prev && <state.prev />}
      {state.prevTooltip && state.prev && (
        <state.prevTooltip>
          <state.prev />
        </state.prevTooltip>
      )}
      {state.root.children}
      {!state.nextTooltip && state.next && <state.next />}
      {state.nextTooltip && state.next && (
        <state.nextTooltip>
          <state.next />
        </state.nextTooltip>
      )}
    </state.root>
  );
};
