import * as React from 'react';
import { render } from '@testing-library/react';
import { azureDarkTheme } from './azureDarkTheme';

describe('azureDarkTheme', () => {
  it('should render', () => {
    render(<azureDarkTheme />);
  });
});
