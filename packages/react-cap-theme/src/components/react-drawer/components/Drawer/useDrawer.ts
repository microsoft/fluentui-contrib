import type {
  DrawerProps,
  DrawerState,
  InlineDrawerProps,
  OverlayDrawerProps,
} from '@fluentui/react-drawer';
import { slot } from '@fluentui/react-utilities';
import type * as React from 'react';
import { InlineDrawer } from '../InlineDrawer/InlineDrawer';
import { OverlayDrawer } from '../OverlayDrawer/OverlayDrawer';

export const useDrawer = (
  props: DrawerProps,
  ref: React.Ref<HTMLElement>
): DrawerState => {
  const elementType = (
    props.type === 'inline' ? InlineDrawer : OverlayDrawer
  ) as React.FC<InlineDrawerProps | OverlayDrawerProps>;
  const root: InlineDrawerProps | OverlayDrawerProps = slot.always(
    { ref, ...props },
    { elementType }
  );

  return {
    components: { root: elementType },
    root,
  };
};
