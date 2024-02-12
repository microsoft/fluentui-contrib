import * as React from 'react';
import { TreeGrid } from './TreeGrid';
import { TreeGridRow } from '../TreeGridRow/TreeGridRow';
import { TreeGridCell } from '../TreeGridCell';
import { Button } from '@fluentui/react-components';

export type TreeGridExampleProps = {
  defaultOpen?: boolean;
};

export const TreeGridExample = (props: TreeGridExampleProps) => (
  <TreeGrid>
    <TreeGridRow
      {...props}
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
      <TreeGridCell header>Header level 1 row 1</TreeGridCell>
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
      {...props}
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
      <TreeGridCell header>Header level 1 row 2</TreeGridCell>
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
