import * as React from 'react';
import { render } from '@testing-library/react';

import { DraggableDialog } from './DraggableDialog';
import { DraggableDialogSurface } from '../DraggableDialogSurface';

describe('DraggableDialog', () => {
  it('should render', () => {
    const text = 'Context';
    const { getByText } = render(
      <DraggableDialog open>
        <DraggableDialogSurface>
          <div>{text}</div>
        </DraggableDialogSurface>
      </DraggableDialog>
    );

    expect(() => getByText(text)).toBeTruthy();
  });
});
