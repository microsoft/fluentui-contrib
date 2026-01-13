import * as React from 'react';
import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  it('should render', () => {
    render(<Header caption="" />);
  });
});
