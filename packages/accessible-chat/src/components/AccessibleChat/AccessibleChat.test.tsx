import * as React from 'react';
import { render } from '@testing-library/react';
import { AccessibleChat } from './AccessibleChat';

describe('AccessibleChat', () => {
  it('should render', () => {
    render(<AccessibleChat />);
  });
});
