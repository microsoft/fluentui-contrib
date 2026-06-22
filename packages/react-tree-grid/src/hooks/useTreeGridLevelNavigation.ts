import { isHTMLElement } from '@fluentui/react-utilities';
import {
  type TreeGridNavigationOverrideProps,
  useTreeGridNavigationOverride,
} from './useTreeGridNavigationOverrides';
import * as React from 'react';
import { ArrowDown, ArrowUp } from '@fluentui/keyboard-keys';
import { TreeGridTabsterMoveFocusEventDetail } from '../components/TreeGrid/TreeGrid.types';

type AdjacentRowAtLevelResult =
  | { type: 'same-level'; row: HTMLElement }
  | { type: 'shallower-boundary' }
  | { type: 'none' };

/**
 * Keeps vertical arrow navigation at the current row level until TreeGrid
 * reaches a shallower boundary, where default TreeGrid navigation resumes.
 */
export const useTreeGridLevelNavigation = (): TreeGridNavigationOverrideProps =>
  useTreeGridNavigationOverride({
    focusPrevious: { shouldOverride, onKeyDown },
    focusNext: { shouldOverride, onKeyDown },
  });

const findAdjacentRowAtLevel = (
  row: HTMLElement,
  direction: Direction
): AdjacentRowAtLevelResult => {
  const level = Number(row.getAttribute('aria-level'));
  if (Number.isNaN(level)) {
    return { type: 'none' };
  }

  const treeGrid = row.closest<HTMLElement>('[role="treegrid"]');
  if (!treeGrid) {
    return { type: 'none' };
  }

  const nodeFilter = row.ownerDocument.defaultView?.NodeFilter;
  if (!nodeFilter) {
    return { type: 'none' };
  }

  const rowWalker = row.ownerDocument.createTreeWalker(
    treeGrid,
    nodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) =>
        isHTMLElement(node) && node.getAttribute('role') === 'row'
          ? nodeFilter.FILTER_ACCEPT
          : nodeFilter.FILTER_SKIP,
    }
  );

  rowWalker.currentNode = row;

  for (
    let sibling =
      direction === ArrowDown ? rowWalker.nextNode() : rowWalker.previousNode();
    sibling;
    sibling =
      direction === ArrowDown ? rowWalker.nextNode() : rowWalker.previousNode()
  ) {
    if (!isHTMLElement(sibling)) {
      continue;
    }

    const siblingLevel = Number(sibling.getAttribute('aria-level'));

    if (Number.isNaN(siblingLevel)) {
      return { type: 'none' };
    }

    if (siblingLevel < level) {
      return { type: 'shallower-boundary' };
    }

    if (siblingLevel === level) {
      return { type: 'same-level', row: sibling };
    }
  }

  return { type: 'none' };
};

type Direction = typeof ArrowUp | typeof ArrowDown;

const getAdjacentRowAtLevel = (
  event: KeyboardEvent
): AdjacentRowAtLevelResult => {
  if (!isHTMLElement(event.target)) {
    return { type: 'none' };
  }

  const row = event.target.closest<HTMLElement>('[role="row"]');
  if (!row) {
    return { type: 'none' };
  }

  return findAdjacentRowAtLevel(row, event.key as Direction);
};

const shouldOverride = (
  event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>
): boolean => {
  return (
    getAdjacentRowAtLevel(event.detail.relatedEvent).type !==
    'shallower-boundary'
  );
};

const onKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
  const adjacentRow = getAdjacentRowAtLevel(event.nativeEvent);
  if (adjacentRow.type === 'shallower-boundary') {
    return;
  }

  event.preventDefault();

  if (adjacentRow.type === 'same-level') {
    adjacentRow.row.scrollIntoView({ block: 'nearest' });
    adjacentRow.row.focus();
  }
};
