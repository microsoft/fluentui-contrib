import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('should render', () => {
    render(<Toolbar />);
  });
});
