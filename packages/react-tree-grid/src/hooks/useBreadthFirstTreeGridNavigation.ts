import { isHTMLElement } from '@fluentui/react-utilities';
import {
  treeGridNavigationHandled,
  treeGridNavigationPass,
  useTreeGridNavigationOverrides,
  type TreeGridNavigationOverrideOptions,
  type TreeGridNavigationStageResult,
} from './useTreeGridNavigationOverrides';

type AdjacentRowAtLevelResult =
  | { type: 'same-level'; row: HTMLElement }
  | { type: 'shallower-boundary' }
  | { type: 'none' };

export const findAdjacentRowAtLevel = (
  row: HTMLElement,
  direction: 1 | -1
): AdjacentRowAtLevelResult => {
  const level = Number(row.getAttribute('aria-level'));
  if (Number.isNaN(level)) {
    return { type: 'none' };
  }

  let sibling: Element | null =
    direction === 1 ? row.nextElementSibling : row.previousElementSibling;

  while (sibling) {
    if (isHTMLElement(sibling) && sibling.getAttribute('role') === 'row') {
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

    sibling =
      direction === 1
        ? sibling.nextElementSibling
        : sibling.previousElementSibling;
  }

  return { type: 'none' };
};

const resolveBreadthFirstNavigation = (
  row: HTMLElement,
  direction: 1 | -1
): TreeGridNavigationStageResult => {
  const adjacentRow = findAdjacentRowAtLevel(row, direction);
  if (adjacentRow.type === 'same-level') {
    return {
      type: 'handled',
      request: () => {
        adjacentRow.row.scrollIntoView({ block: 'nearest' });
        adjacentRow.row.focus();
      },
    };
  }

  return adjacentRow.type === 'shallower-boundary'
    ? treeGridNavigationPass
    : treeGridNavigationHandled;
};

export const useBreadthFirstTreeGridNavigation =
  (): TreeGridNavigationOverrideOptions =>
    useTreeGridNavigationOverrides({
      onFocusPrevious: (row) => resolveBreadthFirstNavigation(row, -1),
      onFocusNext: (row) => resolveBreadthFirstNavigation(row, 1),
    });
