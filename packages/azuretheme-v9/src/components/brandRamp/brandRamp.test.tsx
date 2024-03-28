import * as React from 'react';
import { render } from '@testing-library/react';
import { brandRamp } from './brandRamp';

describe('brandRamp', () => {
  it('should render', () => {
    render(<brandRamp />);
  });
});
