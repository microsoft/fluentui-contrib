import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Keytips } from './Keytips';
import { useKeytipRef } from '../../hooks/useKeytipRef';
import { Button } from '@fluentui/react-components';
import userEvent from '@testing-library/user-event';
import { useEventService } from '../../hooks/useEventService';
import { EVENTS } from '../../constants';

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

    render(<Component />);

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

  it('should support different invoking event', async () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'removeEventListener');

    const Component = () => {
      const ref = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
      });

      return (
        <>
          {/* default is keydown */}
          <Keytips invokeEvent="keyup" />
          <Button ref={ref}>keytip A</Button>
        </>
      );
    };

    const { unmount } = render(<Component />);

    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    expect(addEventListener).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
  });

  it('should update keytip by manually dispatched update event', async () => {
    const Component = () => {
      const { dispatch } = useEventService();

      const ref = useKeytipRef({
        keySequences: ['a'],
        content: 'A',
        uniqueId: 'meow',
      });

      // manually dispatching update event
      const updateKeytip = () =>
        dispatch(EVENTS.KEYTIP_UPDATED, {
          keySequences: ['b'],
          content: 'B',
          uniqueId: 'meow',
        });

      return (
        <>
          {/* default is keydown */}
          <Keytips invokeEvent="keyup" />
          <Button ref={ref}>keytip A</Button>
          <Button onClick={updateKeytip}>Update</Button>
        </>
      );
    };

    const { debug } = render(<Component />);

    // first enter keytip mode
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    const tooltip = screen.getByRole('tooltip', { name: 'A' });
    const button = screen.getByRole('button', { name: 'Update' });

    expect(tooltip).toBeDefined();

    // trigger keytip to exit keytip mode
    await act(async () => await userEvent.keyboard('A'));

    // trigger update
    userEvent.click(button);

    // show update keytip
    await act(async () => await userEvent.keyboard('{Alt>}{Meta}'));

    const updatedTooltip = screen.getByRole('tooltip', { name: 'B' });

    expect(updatedTooltip).toBeDefined();
  });
});
