import * as React from 'react';
import { render } from '@testing-library/react';
import { lightTheme } from './lightTheme';

describe('lightTheme', () => {
  it('should render', () => {
    render(<lightTheme />);
  });
});
