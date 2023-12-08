import * as React from 'react';
import { render } from '@testing-library/react';

import { HeadlessFluentProvider } from './HeadlessFluentProvider';

describe('HeadlessFluentProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <HeadlessFluentProvider>
        <span>Hello world!</span>
      </HeadlessFluentProvider>
    );

    expect(() => getByText('Hello world!')).not.toThrow();
  });
});
