import * as React from 'react';
import { render } from '@testing-library/react';
import { Keytip } from './Keytip';

describe('Keytip', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Keytip content="A" keySequences={['A']} />);
    expect(result.container).toMatchSnapshot();
  });
});
