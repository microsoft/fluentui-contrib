import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialog } from './DraggableDialog';

describe('DraggableDialog', () => {
  it('should render', () => {
    const text = 'Context';
    const { getByText } = render(
      <DraggableDialog>
        <div>{text}</div>
      </DraggableDialog>
    );

    expect(() => getByText(text)).toBeTruthy();
  });
});
