import * as React from 'react';
import { TreeGrid } from './TreeGrid';
import { useTreeGridNavigationOverrides } from '../../hooks/useTreeGridNavigationOverrides';
import { TreeGridRow } from '../TreeGridRow/TreeGridRow';
import { TreeGridCell } from '../TreeGridCell';
import { Button } from '@fluentui/react-components';
import { isHTMLElement } from '@fluentui/react-utilities';

type TreeGridVerticalNavigationMode = 'depth-first' | 'breadth-first';

type AdjacentRowAtLevelResult =
  | { type: 'same-level'; row: HTMLElement }
  | { type: 'shallower-boundary' }
  | { type: 'none' };

const findAdjacentRowAtLevel = (
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

export type TreeGridExampleProps = {
  defaultOpen?: boolean;
  focusableHeaderCell?: boolean;
  verticalNavigationMode?: TreeGridVerticalNavigationMode;
};

export const TreeGridExample = ({
  defaultOpen,
  focusableHeaderCell,
  verticalNavigationMode,
}: TreeGridExampleProps) => {
  const breadthFirstNavigation = useTreeGridNavigationOverrides({
    onFocusPrevious: (row) => {
      const previousRow = findAdjacentRowAtLevel(row, -1);
      if (previousRow.type === 'same-level') {
        previousRow.row.focus();
      }

      return previousRow.type !== 'shallower-boundary';
    },
    onFocusNext: (row) => {
      const nextRow = findAdjacentRowAtLevel(row, 1);
      if (nextRow.type === 'same-level') {
        nextRow.row.focus();
      }

      return nextRow.type !== 'shallower-boundary';
    },
  });

  return (
    <TreeGrid
      {...(verticalNavigationMode === 'breadth-first'
        ? breadthFirstNavigation
        : undefined)}
    >
      <TreeGridRow
        defaultOpen={defaultOpen}
        data-testid="level-1-row-1"
        subtree={
          <>
            <TreeGridRow data-testid="level-2-row-1">
              <TreeGridCell header>Header level 2 row 1</TreeGridCell>
              <TreeGridCell>
                <Button>Button 1 level 2 row 1</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 2 level 2 row 1</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 3 level 2 row 1</Button>
              </TreeGridCell>
            </TreeGridRow>
            <TreeGridRow data-testid="level-2-row-2">
              <TreeGridCell header>Header level 2 row 2</TreeGridCell>
              <TreeGridCell>
                <Button>Button 1 level 2 row 2</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 2 level 2 row 2</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 3 level 2 row 2</Button>
              </TreeGridCell>
            </TreeGridRow>
          </>
        }
      >
        <TreeGridCell header tabIndex={focusableHeaderCell ? 0 : undefined}>
          Header level 1 row 1
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 1 level 1 row 1</Button>
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 2 level 1 row 1</Button>
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 3 level 1 row 1</Button>
        </TreeGridCell>
      </TreeGridRow>
      <TreeGridRow
        defaultOpen={defaultOpen}
        data-testid="level-1-row-2"
        subtree={
          <>
            <TreeGridRow data-testid="level-2-row-3">
              <TreeGridCell header>Header level 2 row 3</TreeGridCell>
              <TreeGridCell>
                <Button>Button 1 level 2 row 3</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 2 level 2 row 3</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 3 level 2 row 3</Button>
              </TreeGridCell>
            </TreeGridRow>
            <TreeGridRow data-testid="level-2-row-4">
              <TreeGridCell header>Header level 2 row 4</TreeGridCell>
              <TreeGridCell>
                <Button>Button 1 level 2 row 4</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 2 level 2 row 4</Button>
              </TreeGridCell>
              <TreeGridCell>
                <Button>Button 3 level 2 row 4</Button>
              </TreeGridCell>
            </TreeGridRow>
          </>
        }
      >
        <TreeGridCell header tabIndex={focusableHeaderCell ? 0 : undefined}>
          Header level 1 row 2
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 1 level 1 row 2</Button>
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 2 level 1 row 2</Button>
        </TreeGridCell>
        <TreeGridCell>
          <Button>Button 3 level 1 row 2</Button>
        </TreeGridCell>
      </TreeGridRow>
    </TreeGrid>
  );
};
