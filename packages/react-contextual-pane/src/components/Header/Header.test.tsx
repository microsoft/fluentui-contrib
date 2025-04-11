import * as React from 'react';
import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should render', () => {
    render(<Header />);
  });
});
