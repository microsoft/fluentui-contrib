import * as React from 'react';
import { useFluent, useTimeout } from '@fluentui/react-components';
import { KeytipsProps } from '../components/Keytips/Keytips.types';
import { Space } from '@fluentui/keyboard-keys';

type Options = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  delay?: number;
};

export type Hotkey = [string, (ev: KeyboardEvent) => void, Options?];

export type InputHotkey = {
  key?: string;
  modifiers: string[];
};

const MODIFIERS = ['shift', 'alt', 'control'];

export const parseHotkey = (hotkey: string) => {
  const keys = hotkey
    .toLowerCase()
    .split('+')
    .map((key) => key.trim());

  const modifiers = keys.filter((key) => MODIFIERS.includes(key));
  const key = keys.find((k) => !modifiers.includes(k));

  return {
    modifiers,
    key,
  };
};

const isKeyMatchingKeyboardEvent = (
  hotkey: InputHotkey,
  event: KeyboardEvent
) => {
  const { key: eventKey } = event;
  const { modifiers, key } = hotkey;

  const pressedModifiers = [
    event.altKey && 'alt',
    event.shiftKey && 'shift',
    event.ctrlKey && 'control',
  ].filter(Boolean);

  const pressedKey = event.code === Space ? 'space' : eventKey.toLowerCase();

  const modifiersMatch =
    modifiers.length === pressedModifiers.length &&
    modifiers.every((mod) => pressedModifiers.includes(mod));

  if (!modifiersMatch) {
    return false;
  }

  return key === pressedKey;
};

export const useHotkeys = (
  hotkeys: Hotkey[],
  invokeEvent: KeytipsProps['invokeEvent'] = 'keydown',
  target?: Document
) => {
  const { targetDocument } = useFluent();
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();
  const doc = target ?? targetDocument;
  const activeKeys = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    const handleInvokeEvent = (ev: KeyboardEvent) => {
      hotkeys.forEach(
        ([hotkey, handler, options = { preventDefault: true }]) => {
          const event = (
            'nativeEvent' in ev ? ev.nativeEvent : ev
          ) as KeyboardEvent;

          if (!ev.key) {
            return;
          }

          if (isKeyMatchingKeyboardEvent(parseHotkey(hotkey), event)) {
            if (options.preventDefault) {
              ev.preventDefault();
            }

            if (options.stopPropagation) {
              ev.stopPropagation();
            }

            // if options.delay is > 0, it will be needed to hold the sequence
            // to fire the handler
            if (options.delay && options.delay > 0) {
              clearDelayTimeout();
              activeKeys.current.add(ev.key);
              setDelayTimeout(() => {
                if (activeKeys.current.has(ev.key)) {
                  handler(event);
                }
              }, options.delay);
            } else {
              handler(event);
            }
          }
        }
      );
    };

    const handleKeyUp = (ev: KeyboardEvent) => {
      activeKeys.current.delete(ev.key);

      if (activeKeys.current.size === 0) {
        clearDelayTimeout();
      }
    };

    doc?.addEventListener(invokeEvent, handleInvokeEvent);
    doc?.addEventListener('keyup', handleKeyUp);
    return () => {
      doc?.removeEventListener(invokeEvent, handleInvokeEvent);
      doc?.removeEventListener('keyup', handleKeyUp);
      clearDelayTimeout();
    };
  }, [hotkeys, doc]);
};
