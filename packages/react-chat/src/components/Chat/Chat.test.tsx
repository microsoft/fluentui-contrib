import * as React from 'react';
import { render } from '@testing-library/react';
import { Chat } from './Chat';

describe('Chat', () => {
  it('should render', () => {
    render(<Chat />);
  });

  it('should be able to override tabster', () => {
    const { container } = render(<Chat data-tabster="foo" />);
    expect(container.firstElementChild?.getAttribute('data-tabster')).toBe(
      'foo'
    );
  });
});
