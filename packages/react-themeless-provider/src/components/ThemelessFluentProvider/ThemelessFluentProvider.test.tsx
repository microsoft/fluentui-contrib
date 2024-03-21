import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemelessFluentProvider } from './ThemelessFluentProvider';

describe('ThemelessFluentProvider', () => {
  it('should render', () => {
    render(<ThemelessFluentProvider />);
  });
});
