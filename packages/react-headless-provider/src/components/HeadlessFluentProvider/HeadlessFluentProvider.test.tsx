import * as React from 'react';
import { render } from '@testing-library/react';
import { HeadlessFluentProvider } from './HeadlessFluentProvider';

describe('HeadlessFluentProvider', () => {
  it('should render', () => {
    render(<HeadlessFluentProvider />);
  });
});
