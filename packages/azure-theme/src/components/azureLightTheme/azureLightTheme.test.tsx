import * as React from 'react';
import { render } from '@testing-library/react';
import { azureLightTheme } from './azureLightTheme';

describe('azureLightTheme', () => {
  it('should render', () => {
    render(<azureLightTheme />);
  });
});
