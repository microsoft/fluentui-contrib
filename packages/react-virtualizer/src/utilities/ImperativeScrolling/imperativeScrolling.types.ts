import * as React from 'react';

export type ScrollToItemStaticParams = {
  index: number;
  itemSize: number;
  totalItems: number;
  scrollViewRef: React.RefObject<HTMLDivElement | null>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToItemDynamicParams = {
  index: number;
  itemSizes: React.RefObject<number[]>;
  totalSize: number;
  scrollViewRef: React.RefObject<HTMLDivElement | null>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToInterface = {
  scrollTo: (
    index: number,
    behavior?: ScrollBehavior,
    callback?: (index: number) => void
  ) => void;
  scrollToPosition: (
    position: number,
    behavior?: ScrollBehavior,
    index?: number,
    callback?: ((index: number) => void)
  ) => void;
  virtualizerLength: React.RefObject<number | null>;
  currentIndex: React.RefObject<number | null> | undefined;
  // SizeTrackingArray tracks the actual resize observer sizes
  // This differs from the internal virtualization tracking which is updated on-render
  sizeTrackingArray?: React.RefObject<number[]>;
};
