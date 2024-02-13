import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';

describe('DraggableDialogSurface', () => {
  it('should render', () => {
    render(
      <DraggableDialogSurface>
        <div>Content</div>
      </DraggableDialogSurface>
    );
  });
});
