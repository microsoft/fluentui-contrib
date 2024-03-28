import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemelessFluentProvider } from './ThemelessFluentProvider';

describe('ThemelessFluentProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ThemelessFluentProvider>
        <span>Hello world!</span>
      </ThemelessFluentProvider>
    );

    expect(() => getByText('Hello world!')).not.toThrow();
  });

  it('does not render style elements', () => {
    render(<ThemelessFluentProvider />);
    expect(document.head.querySelector('style')).toBeNull();
  });
});
