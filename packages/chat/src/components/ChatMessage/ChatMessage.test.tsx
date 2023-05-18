import * as React from 'react';
import { render } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  it('should render', () => {
    render(<ChatMessage />);
  });
});
