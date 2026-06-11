import * as React from 'react';
import { TreeGrid } from '../../TreeGrid';
import { useTreeGridLevelNavigation } from '../../../../hooks/useTreeGridLevelNavigation';
import { TreeGridRow } from '../../../TreeGridRow/TreeGridRow';
import { TreeGridCell } from '../../../TreeGridCell';
import { Button } from '@fluentui/react-components';

type TreeGridVerticalNavigationMode = 'depth-first' | 'breadth-first';

export type TreeGridExampleProps = {
  defaultOpen?: boolean;
  focusableHeaderCell?: boolean;
  verticalNavigationMode?: TreeGridVerticalNavigationMode;
};

export const TreeGridExample = ({
  defaultOpen,
  focusableHeaderCell,
  verticalNavigationMode,
}: TreeGridExampleProps): React.ReactElement => {
  const levelNavigation = useTreeGridLevelNavigation();
  return (
    <TreeGrid
      {...(verticalNavigationMode === 'breadth-first' ? levelNavigation : {})}
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
