import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  it('should render', () => {
    render(<MenuButton />);
  });
});
