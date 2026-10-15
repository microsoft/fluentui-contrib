import * as React from 'react';
import { render } from '@testing-library/react';
import { Chat } from './Chat';

describe('Chat', () => {
  it('should render', () => {
    render(<Chat />);
  });

  it('should accept a custom chat max width through a CSS variable', () => {
    const { container } = render(
      <Chat style={{ '--fui-chat-max-width': '100%' } as React.CSSProperties} />
    );

    expect(container.firstElementChild).toHaveStyle(
      '--fui-chat-max-width: 100%'
    );
  });

  it('should be able to override tabster', () => {
    const { container } = render(<Chat data-tabster="foo" />);
    expect(container.firstElementChild?.getAttribute('data-tabster')).toBe(
      'foo'
    );
  });
});
