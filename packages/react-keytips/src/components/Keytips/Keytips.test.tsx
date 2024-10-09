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

  it('should fire onEnterKeytipsMode and onExitKeytipsMode', async () => {
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
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(screen.queryAllByRole('tooltip')).toHaveLength(1);
    expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);

    await act(async () => await userEvent.keyboard('{Alt>}{Escape}'));
    expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    expect(onExitKeytipsMode).toHaveBeenCalledTimes(1);
  });
});
