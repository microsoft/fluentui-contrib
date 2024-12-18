import * as React from 'react';
import { useFluent, useTimeout } from '@fluentui/react-components';
import { KeytipsProps } from '../components/Keytips/Keytips.types';

type Options = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  delay?: number;
};

export type Hotkey = [string, (ev: KeyboardEvent) => void, Options?];

export type InputHotkey = {
  alt: boolean;
  shift: boolean;
  key?: string;
};

const RESERVED = ['shift', 'alt'];

export const parseHotkey = (hotkey: string) => {
  const keys = hotkey
    .toLowerCase()
    .split('+')
    .map((key) => key.trim());

  const modifiers = {
    alt: keys.includes('alt'),
    shift: keys.includes('shift'),
  };

  const key = keys.find((k) => !RESERVED.includes(k));

  return {
    ...modifiers,
    key,
  };
};

const isKeyMatchingKeyboardEvent = (
  hotkey: InputHotkey,
  event: KeyboardEvent
) => {
  const { altKey, shiftKey, key: eventKey } = event;
  const { alt, shift } = hotkey;

  const key = hotkey.key === '' ? 'space' : hotkey.key?.toLowerCase();
  const pressedKey = eventKey === ' ' ? 'space' : eventKey.toLowerCase();

  if (alt !== altKey || shift !== shiftKey) {
    return false;
  }

  if (pressedKey === key || event.code.replace('Key', '') === key) {
    return true;
  }

  return false;
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
