import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Keytip, keytipClassNames } from '.';

describe('Keytip', () => {
  it('renders a default state', () => {
    render(<Keytip content="A" keySequences={['a']} visible />);
    const keytip = screen.getByRole('tooltip');
    expect(keytip.classList.contains(keytipClassNames.content)).toBeTruthy();
    expect(keytip.id).toBe('keytip-ktp-a');
  });
});
