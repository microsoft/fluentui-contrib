import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Keytips } from './Keytips';
import { useKeytipRef } from '../..';
import { Button } from '@fluentui/react-components';
import userEvent from '@testing-library/user-event';

describe('Keytips', () => {
  it('renders a default state', () => {
    const rootId = 'ktp';
    const content = 'Alt Windows';

    const { baseElement } = render(<Keytips content={content} />);
    const keytipsRoot = baseElement.querySelector(`#${rootId}`);
    expect(keytipsRoot?.getAttribute('data-start-shortcut')).toEqual(content);
  });

  it('should have invisible keytips', () => {
    const Component = () => {
      const firstButton = useKeytipRef<HTMLButtonElement | HTMLAnchorElement>({
        keySequences: ['b1'],
        content: 'B1',
      });

      const secondButton = useKeytipRef<HTMLButtonElement | HTMLAnchorElement>({
        keySequences: ['b2'],
        content: 'B2',
      });

      return (
        <>
          <Keytips content="Alt Windows" />
          <Button ref={firstButton}>1</Button>
          <Button ref={secondButton}>2</Button>
        </>
      );
    };

    const { baseElement } = render(<Component />);

    const portal = baseElement.querySelector('[data-portal-node]');

    expect(portal?.children).toHaveLength(3);
    expect(screen.getByText('b1')).toBeTruthy();
    expect(screen.getByText('b2')).toBeTruthy();
  });

  it('should have invisible and visible keytips', async () => {
    const Component = () => {
      const firstButton = useKeytipRef<HTMLButtonElement | HTMLAnchorElement>({
        keySequences: ['b1'],
        content: 'B1',
      });

      const secondButton = useKeytipRef<HTMLButtonElement | HTMLAnchorElement>({
        keySequences: ['b2'],
        content: 'B2',
      });

      return (
        <>
          <Keytips content="Alt Meta" />
          <Button ref={firstButton}>1</Button>
          <Button ref={secondButton}>2</Button>
        </>
      );
    };

    render(<Component />);

    expect(screen.getByText('b1')).toBeTruthy();
    expect(screen.getByText('b2')).toBeTruthy();

    expect(screen.queryAllByRole('tooltip')).toHaveLength(0);

    // enter keytip mode
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(screen.getAllByRole('tooltip')).toHaveLength(2);
  });

  it('should navigate deeper and upper by pressing key sequence and return sequence', async () => {
    const Component = () => {
      const firstButton = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
      });

      const secondButton = useKeytipRef({
        keySequences: ['a', 'b'],
        content: 'B',
      });

      const thirdButton = useKeytipRef({
        keySequences: ['a', 'b', 'c'],
        content: 'C',
      });

      return (
        <>
          <Keytips content="Alt Meta" />
          <Button ref={firstButton}>keytip A</Button>
          <Button ref={secondButton}>keytip B</Button>
          <Button ref={thirdButton}>keytip C</Button>
        </>
      );
    };

    const { baseElement } = render(<Component />);

    // enter keytip mode
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(screen.getAllByRole('tooltip')).toHaveLength(1);
    // shows the root level keytip (A)
    expect(baseElement.querySelector('#keytip-ktp-a')).toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b-c')).not.toBeTruthy();

    // should show the next keytip (B)
    await act(async () => await userEvent.keyboard('{A}'));
    expect(baseElement.querySelector('#keytip-ktp-a-b')).toBeTruthy();

    // should show the next keytip (C)
    await act(async () => await userEvent.keyboard('{B}'));

    expect(baseElement.querySelector('#keytip-ktp-a')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b-c')).toBeTruthy();

    // should show previous keytip (B)
    await act(async () => await userEvent.keyboard('{Escape}'));

    expect(baseElement.querySelector('#keytip-ktp-a-b')).toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b-c')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a')).not.toBeTruthy();

    // // should show previous keytip (A)
    await act(async () => await userEvent.keyboard('{Escape}'));

    expect(baseElement.querySelector('#keytip-ktp-a')).toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b-c')).not.toBeTruthy();
  });
});
