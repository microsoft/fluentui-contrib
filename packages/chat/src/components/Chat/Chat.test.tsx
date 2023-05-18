import * as React from 'react';
import { render } from '@testing-library/react';
import { Chat } from './Chat';

describe('Chat', () => {
  it('should render', () => {
    render(<Chat />);
  });
});
