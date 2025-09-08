import * as React from 'react';
import { useFluent, useTimeout } from '@fluentui/react-components';
import { KeytipsProps } from '../../components/Keytips/Keytips.types';
import type { Hotkey } from './useHotkeys.types';
import { isKeyMatchingKeyboardEvent } from './isMatchingKeyboardEvent';
import { parseHotkey } from './parseHotkey';

export const useHotkeys = (
  hotkeys: Hotkey[],
  options?: { invokeEvent?: KeytipsProps['invokeEvent']; target?: Document }
): void => {
  const { targetDocument } = useFluent();
  const { target, invokeEvent = 'keydown' } = options ?? {};
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();
  const doc = target ?? targetDocument;
  const activeKeys = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    const handleInvokeEvent = (ev: KeyboardEvent) => {
      hotkeys.forEach(([hotkey, handler, options]) => {
        const event = (
          'nativeEvent' in ev ? ev.nativeEvent : ev
        ) as KeyboardEvent;

        if (!ev.key) {
          return;
        }

        if (isKeyMatchingKeyboardEvent(parseHotkey(hotkey), event)) {
          if (options?.preventDefault) {
            ev.preventDefault();
          }

          if (options?.stopPropagation) {
            ev.stopPropagation();
          }

          // if options.delay is > 0, it will be needed to hold the sequence
          // to fire the handler
          if (options?.delay && options.delay > 0) {
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
      });
    };

    const handleKeyUp = (ev: KeyboardEvent) => {
      activeKeys.current.delete(ev.key);

      if (activeKeys.current.size === 0) {
        clearDelayTimeout();
      }
    };

    doc?.addEventListener(invokeEvent, handleInvokeEvent, true);
    doc?.addEventListener('keyup', handleKeyUp);
    return () => {
      doc?.removeEventListener(invokeEvent, handleInvokeEvent, true);
      doc?.removeEventListener('keyup', handleKeyUp);
      clearDelayTimeout();
    };
  }, [hotkeys, doc]);
};
