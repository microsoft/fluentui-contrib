import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Keytips } from './Keytips';
import { useKeytipRef } from '../../hooks/useKeytipRef';
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

    const { baseElement } = render(<Component />);

    expect(screen.getByText('b1')).toBeTruthy();
    expect(screen.getByText('b2')).toBeTruthy();
    const portal = baseElement.querySelector('[data-portal-node]');

    expect(portal?.children).toHaveLength(3);

    expect(screen.queryAllByRole('tooltip')).toHaveLength(0);

    // enter keytip mode
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(screen.getAllByRole('tooltip')).toHaveLength(2);
  });

  it('should navigate deeper and upper by pressing key sequence and return sequence', async () => {
    const onReturn = jest.fn();

    const Component = () => {
      const firstButton = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
        onReturn,
      });

      const secondButton = useKeytipRef({
        keySequences: ['a', 'b'],
        content: 'B',
        onReturn,
      });

      const thirdButton = useKeytipRef({
        keySequences: ['a', 'b', 'c'],
        content: 'C',
        onReturn,
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
    expect(onReturn).toHaveBeenCalledTimes(1);

    // // should show previous keytip (A)
    await act(async () => await userEvent.keyboard('{Escape}'));

    expect(baseElement.querySelector('#keytip-ktp-a')).toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b')).not.toBeTruthy();
    expect(baseElement.querySelector('#keytip-ktp-a-b-c')).not.toBeTruthy();
    expect(onReturn).toHaveBeenCalledTimes(2);
  });

  it('should fire onExecute', async () => {
    const onExecute = jest.fn();

    const Component = () => {
      const ref = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
        onExecute,
      });

      return (
        <>
          <Keytips />
          <Button ref={ref}>keytip A</Button>
        </>
      );
    };

    render(<Component />);

    // enter keytip mode
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(onExecute).not.toHaveBeenCalled();

    await act(async () => await userEvent.keyboard('{A}'));

    expect(onExecute).toHaveBeenCalledTimes(1);
  });

  it('should have custom start and exit sequences', async () => {
    const onEnterKeytipsMode = jest.fn();
    const onExitKeytipsMode = jest.fn();

    const Component = () => {
      const ref = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
      });

      return (
        <>
          <Keytips
            startSequence="alt+s"
            exitSequence="alt+x"
            content="Alt S"
            onEnterKeytipsMode={onEnterKeytipsMode}
            onExitKeytipsMode={onExitKeytipsMode}
          />
          <Button ref={ref}>keytip A</Button>
        </>
      );
    };

    render(<Component />);

    expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    // enter keytip mode
    await act(async () => await userEvent.keyboard('{alt>}{s}'));
    expect(screen.queryAllByRole('tooltip')).toHaveLength(1);
    expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);

    await act(async () => await userEvent.keyboard('{alt>}{x}'));
    expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    expect(onExitKeytipsMode).toHaveBeenCalledTimes(1);
  });
});
