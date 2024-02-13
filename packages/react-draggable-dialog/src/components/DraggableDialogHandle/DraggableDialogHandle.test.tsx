import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogHandle } from './DraggableDialogHandle';

describe('DraggableDialogHandle', () => {
  it('should render', () => {
    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );
  });
});
