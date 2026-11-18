import * as React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Keytips } from './Keytips';
import { useKeytipRef } from '../../hooks/useKeytipRef';
import { Button } from '@fluentui/react-components';
import userEvent from '@testing-library/user-event';
import type { KeytipsProps } from './Keytips.types';
import type { KeytipProps } from '../Keytip/Keytip.types';
import { useKeytipsManager } from '../../hooks/useKeytipsManager';

const ModifierExample = ({
  onExecute,
  onKeyDown,
  onKeyUp,
  ...props
}: KeytipsProps & { onExecute?: KeytipProps['onExecute'] }) => {
  const home = useKeytipRef({
    keySequences: ['h'],
    content: 'H',
    onExecute,
  });
  const child = useKeytipRef({
    keySequences: ['h', 'a'],
    content: 'A',
    onExecute,
  });
  const partial = useKeytipRef({
    keySequences: ['b1'],
    content: 'B1',
    onExecute,
  });
  const { enterKeytipMode } = useKeytipsManager();

  return (
    <>
      <Keytips activationModifier="alt" {...props} />
      <Button ref={home} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
        Home
      </Button>
      <Button ref={child}>Child</Button>
      <Button ref={partial}>Partial</Button>
      <Button onClick={enterKeytipMode}>Enter</Button>
    </>
  );
};

const dispatchKey = (
  type: 'keydown' | 'keyup',
  key: string,
  options: KeyboardEventInit = {}
) => {
  const event = new KeyboardEvent(type, {
    bubbles: true,
    cancelable: true,
    key,
    ...options,
  });
  fireEvent(screen.getByRole('button', { name: 'Home' }), event);
  return event;
};

const pressAlt = () => {
  const down = dispatchKey('keydown', 'Alt', { altKey: true });
  const up = dispatchKey('keyup', 'Alt');
  return { down, up };
};

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

  describe('plain modifier activation', () => {
    it('consumes the first press and release but passes a consecutive second gesture through', () => {
      const onEnterKeytipsMode = jest.fn();
      const onExitKeytipsMode = jest.fn();
      render(
        <ModifierExample
          onEnterKeytipsMode={onEnterKeytipsMode}
          onExitKeytipsMode={onExitKeytipsMode}
        />
      );

      const first = pressAlt();
      expect(first.down.defaultPrevented).toBe(true);
      expect(first.up.defaultPrevented).toBe(true);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(2);
      expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);

      const second = pressAlt();
      expect(second.down.defaultPrevented).toBe(false);
      expect(second.up.defaultPrevented).toBe(false);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      expect(onExitKeytipsMode).toHaveBeenCalledTimes(1);
    });

    it('does not count held or repeated modifier events as a second invocation', () => {
      const onEnterKeytipsMode = jest.fn();
      render(<ModifierExample onEnterKeytipsMode={onEnterKeytipsMode} />);
      dispatchKey('keydown', 'Alt', { altKey: true });
      expect(
        dispatchKey('keydown', 'Alt', { altKey: true, repeat: true })
          .defaultPrevented
      ).toBe(true);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(2);
      expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);
      dispatchKey('keyup', 'Alt');
      expect(pressAlt().down.defaultPrevented).toBe(false);
    });

    it.each(['h', 'b', 'x'])(
      'does not execute held Alt+%s and lets the application handle it once',
      (key) => {
        const onExecute = jest.fn();
        const onKeyDown = jest.fn();
        render(<ModifierExample onExecute={onExecute} onKeyDown={onKeyDown} />);
        dispatchKey('keydown', 'Alt', { altKey: true });
        const input = dispatchKey('keydown', key, { altKey: true });
        expect(input.defaultPrevented).toBe(false);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onExecute).not.toHaveBeenCalled();
        expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
        expect(dispatchKey('keyup', 'Alt').defaultPrevented).toBe(true);
      }
    );

    it.each(['h', 'b'])(
      'consumes a non-consecutive activation after sequential %s input',
      (key) => {
        const onExecute = jest.fn();
        render(<ModifierExample onExecute={onExecute} />);
        pressAlt();
        expect(dispatchKey('keydown', key).defaultPrevented).toBe(true);
        expect(onExecute).toHaveBeenCalledTimes(key === 'h' ? 1 : 0);
        expect(screen.queryAllByRole('tooltip')).toHaveLength(1);

        const next = pressAlt();
        expect(next.down.defaultPrevented).toBe(true);
        expect(next.up.defaultPrevented).toBe(true);
        expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      }
    );

    it('exits and passes unmatched sequential input through', () => {
      const onKeyDown = jest.fn();
      render(<ModifierExample onKeyDown={onKeyDown} />);
      pressAlt();
      expect(dispatchKey('keydown', 'x').defaultPrevented).toBe(false);
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      expect(pressAlt().down.defaultPrevented).toBe(true);
    });

    it('recovers a lost keyup when a new non-repeated modifier press arrives', () => {
      render(<ModifierExample />);
      dispatchKey('keydown', 'Alt', { altKey: true });
      expect(
        dispatchKey('keydown', 'Alt', { altKey: true }).defaultPrevented
      ).toBe(false);
      expect(dispatchKey('keyup', 'Alt').defaultPrevented).toBe(false);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      expect(pressAlt().down.defaultPrevented).toBe(true);
    });

    it('does not execute on keyup after an application stops the matching keydown', () => {
      const onExecute = jest.fn();
      render(
        <ModifierExample
          invokeEvent="keyup"
          onExecute={onExecute}
          onKeyDown={(ev) => ev.stopPropagation()}
        />
      );
      pressAlt();
      dispatchKey('keydown', 'h');
      dispatchKey('keyup', 'h');
      expect(onExecute).not.toHaveBeenCalled();
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    });

    it.each([
      ['preventDefault', 'keydown'],
      ['stopPropagation', 'keydown'],
      ['preventDefault', 'keyup'],
      ['stopPropagation', 'keyup'],
    ] as const)(
      'gives application %s priority over matching keytips on %s',
      async (method, invokeEvent) => {
        const onExecute = jest.fn();
        const onInput = jest.fn((ev: React.KeyboardEvent) => ev[method]());
        render(
          <ModifierExample
            invokeEvent={invokeEvent}
            onExecute={onExecute}
            onKeyDown={invokeEvent === 'keydown' ? onInput : undefined}
            onKeyUp={invokeEvent === 'keyup' ? onInput : undefined}
          />
        );
        pressAlt();
        await act(async () => {
          dispatchKey('keydown', 'h');
          if (invokeEvent === 'keyup') dispatchKey('keyup', 'h');
        });
        expect(onInput).toHaveBeenCalledTimes(1);
        expect(onExecute).not.toHaveBeenCalled();
        await waitFor(() => {
          expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
        });
      }
    );

    it.each([
      ['.', { altKey: true }],
      ['Meta', { altKey: true, metaKey: true }],
    ] as const)(
      'keeps the %s compatibility alias active during the first gesture',
      (key, options) => {
        const onEnterKeytipsMode = jest.fn();
        render(
          <ModifierExample
            startSequence={['alt+.', 'alt+meta']}
            onEnterKeytipsMode={onEnterKeytipsMode}
          />
        );
        dispatchKey('keydown', 'Alt', { altKey: true });
        dispatchKey('keydown', key, options);
        dispatchKey('keyup', key, { altKey: true });
        dispatchKey('keyup', 'Alt');
        expect(screen.queryAllByRole('tooltip')).toHaveLength(2);
        expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);
      }
    );

    it.each([
      ['Alt', { altKey: true, code: 'AltRight', location: 2 }],
      ['AltGraph', { altKey: true, ctrlKey: true }],
      ['Alt', { altKey: true, isComposing: true }],
      ['Alt', { altKey: true, ctrlKey: true }],
      ['Alt', { altKey: true, repeat: true }],
    ] as const)('does not claim an ineligible %s event', (key, options) => {
      const onEnterKeytipsMode = jest.fn();
      render(<ModifierExample onEnterKeytipsMode={onEnterKeytipsMode} />);
      expect(dispatchKey('keydown', key, options).defaultPrevented).toBe(false);
      expect(onEnterKeytipsMode).not.toHaveBeenCalled();
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    });

    it('honors enabled for plain, alias, and programmatic entry and dismisses active keytips', async () => {
      const onEnterKeytipsMode = jest.fn();
      const { rerender } = render(
        <ModifierExample
          enabled={false}
          onEnterKeytipsMode={onEnterKeytipsMode}
        />
      );
      expect(pressAlt().down.defaultPrevented).toBe(false);
      dispatchKey('keydown', 'Meta', { altKey: true, metaKey: true });
      await userEvent.click(screen.getByRole('button', { name: 'Enter' }));
      expect(onEnterKeytipsMode).not.toHaveBeenCalled();
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);

      rerender(<ModifierExample onEnterKeytipsMode={onEnterKeytipsMode} />);
      pressAlt();
      expect(screen.queryAllByRole('tooltip')).toHaveLength(2);
      rerender(
        <ModifierExample
          enabled={false}
          onEnterKeytipsMode={onEnterKeytipsMode}
        />
      );
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      expect(pressAlt().down.defaultPrevented).toBe(false);
    });

    it('resets on blur and recovers when the activation keyup is lost', () => {
      render(<ModifierExample />);
      dispatchKey('keydown', 'Alt', { altKey: true });
      fireEvent(window, new Event('blur'));
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      expect(pressAlt().down.defaultPrevented).toBe(true);
      pressAlt();

      dispatchKey('keydown', 'Alt', { altKey: true });
      expect(dispatchKey('keydown', 'h').defaultPrevented).toBe(true);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(1);
      expect(pressAlt().down.defaultPrevented).toBe(true);
    });

    it('supports a different activation modifier and sequential keyup input', () => {
      const onExecute = jest.fn();
      const onEnterKeytipsMode = jest.fn();
      render(
        <ModifierExample
          activationModifier="control"
          invokeEvent="keyup"
          onExecute={onExecute}
          onEnterKeytipsMode={onEnterKeytipsMode}
        />
      );
      expect(
        dispatchKey('keydown', 'Control', { ctrlKey: true }).defaultPrevented
      ).toBe(true);
      expect(onEnterKeytipsMode).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'keydown' }),
        expect.objectContaining({ type: 'keydown' })
      );
      expect(dispatchKey('keyup', 'Control').defaultPrevented).toBe(true);
      dispatchKey('keydown', 'h');
      expect(onExecute).not.toHaveBeenCalled();
      expect(dispatchKey('keyup', 'h').defaultPrevented).toBe(true);
      expect(onExecute).toHaveBeenCalledTimes(1);
    });

    it('advertises plain modifier entry without claiming a simultaneous command shortcut', () => {
      render(<ModifierExample />);
      expect(screen.getByText('Alt')).toBeTruthy();
      expect(
        screen
          .getByRole('button', { name: 'Home' })
          .hasAttribute('aria-keyshortcuts')
      ).toBe(false);
    });

    it('releases event ownership on disposal', () => {
      const { unmount } = render(<ModifierExample />);
      dispatchKey('keydown', 'Alt', { altKey: true });
      unmount();
      const release = new KeyboardEvent('keyup', {
        key: 'Alt',
        bubbles: true,
        cancelable: true,
      });
      fireEvent(document.body, release);
      expect(release.defaultPrevented).toBe(false);
    });

    it('leaves plain Alt unclaimed when activationModifier is omitted', () => {
      const onEnterKeytipsMode = jest.fn();
      render(
        <>
          <Keytips onEnterKeytipsMode={onEnterKeytipsMode} />
          <Button>Home</Button>
        </>
      );

      const first = pressAlt();
      const second = pressAlt();
      expect(first.down.defaultPrevented).toBe(false);
      expect(first.up.defaultPrevented).toBe(false);
      expect(second.down.defaultPrevented).toBe(false);
      expect(second.up.defaultPrevented).toBe(false);
      expect(onEnterKeytipsMode).not.toHaveBeenCalled();

      dispatchKey('keydown', 'Meta', { altKey: true, metaKey: true });
      expect(onEnterKeytipsMode).toHaveBeenCalledTimes(1);
    });

    it('does not opt existing consumers into plain Alt activation', () => {
      render(
        <ModifierExample
          activationModifier={undefined}
          startSequence={['alt+.', 'alt+meta']}
        />
      );
      expect(pressAlt().down.defaultPrevented).toBe(false);
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      dispatchKey('keydown', '.', { altKey: true });
      expect(screen.queryAllByRole('tooltip')).toHaveLength(2);
    });
  });
});
