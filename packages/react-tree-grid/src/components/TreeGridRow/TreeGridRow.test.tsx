import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeGridCell } from '../TreeGridCell';
import { TreeGridRow } from './TreeGridRow';

describe('TreeGridRow', () => {
  it('normalizes explicit level values below 1', () => {
    const result = render(
      <TreeGridRow
        data-testid="parent-row"
        defaultOpen
        level={0}
        subtree={
          <TreeGridRow data-testid="child-row">
            <TreeGridCell header>Child row</TreeGridCell>
          </TreeGridRow>
        }
      >
        <TreeGridCell header>Parent row</TreeGridCell>
      </TreeGridRow>
    );

    expect(result.getByTestId('parent-row').getAttribute('aria-level')).toBe(
      '1'
    );
    expect(result.getByTestId('child-row').getAttribute('aria-level')).toBe(
      '2'
    );
  });
});
