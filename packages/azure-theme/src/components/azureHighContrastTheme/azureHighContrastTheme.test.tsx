import * as React from 'react';
import { render } from '@testing-library/react';
import { azureHighContrastTheme } from './azureHighContrastTheme';

describe('azureHighContrastTheme', () => {
  it('should render', () => {
    render(<azureHighContrastTheme />);
  });
});
