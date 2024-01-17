import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialog } from './DraggableDialog';

describe('DraggableDialog', () => {
  it('should render', () => {
    render(<DraggableDialog />);
  });
});
