import * as React from 'react';
import { render } from '@testing-library/react';
import { darkTheme } from './darkTheme';

describe('darkTheme', () => {
  it('should render', () => {
    render(<darkTheme />);
  });
});
