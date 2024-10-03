import { useIsomorphicLayoutEffect } from '@fluentui/react-components';
import { useFluent } from '@fluentui/react-components';

type Options = { preventDefault?: boolean; stopPropagation?: boolean };
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

export const useHotkeys = (hotkeys: Hotkey[], target?: Document) => {
  const { targetDocument } = useFluent();
  const doc = target ?? targetDocument;

  useIsomorphicLayoutEffect(() => {
    const listener = (ev: KeyboardEvent) => {
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

            handler(event);
          }
        }
      );
    };

    doc?.addEventListener('keydown', listener);
    return () => {
      doc?.removeEventListener('keydown', listener);
    };
  }, [hotkeys, doc]);
};
