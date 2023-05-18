import * as React from 'react';
import { render } from '@testing-library/react';
import { ChatMyMessage } from './ChatMyMessage';

describe('ChatMyMessage', () => {
  it('should render', () => {
    render(<ChatMyMessage />);
  });
});
