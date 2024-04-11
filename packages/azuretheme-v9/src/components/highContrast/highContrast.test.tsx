import * as React from 'react';
import { render } from '@testing-library/react';
import { highContrast } from './highContrast';

describe('highContrast', () => {
  it('should render', () => {
    render(<highContrast />);
  });
});
