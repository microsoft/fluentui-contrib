import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import { EVENTS } from '../constants';
import type { KeytipTreeNode } from '../hooks/useTree';
import type { KeytipWithId } from '../components/Keytip/internal/Keytip.types';

type EventType = (typeof EVENTS)[keyof typeof EVENTS];

type PayloadDefinition = {
  [EVENTS.ENTER_KEYTIP_MODE]: KeyboardEvent;
  [EVENTS.EXIT_KEYTIP_MODE]: KeyboardEvent;
  [EVENTS.KEYTIP_UPDATED]: KeytipWithId;
  [EVENTS.KEYTIP_ADDED]: KeytipWithId;
  [EVENTS.KEYTIP_REMOVED]: KeytipWithId;
  [EVENTS.KEYTIP_EXECUTED]: KeytipTreeNode;
  [EVENTS.SHORTCUT_EXECUTED]: KeytipTreeNode;
};

function isCustomEvent(event: Event): event is CustomEvent {
  return 'detail' in event;
}

function createEventHandler<T>(
  handler: (payload: T) => void
): (ev: Event) => void {
  return (ev: Event) => {
    if (isCustomEvent(ev)) {
      const eventPayload = ev.detail;
      handler(eventPayload);
    }
  };
}

export function useEventService() {
  const { targetDocument } = useFluent();
  const controller = React.useRef<AbortController | null>(
    new AbortController()
  );

  const dispatch = React.useCallback(
    <T extends EventType>(eventName: T, payload?: PayloadDefinition[T]) => {
      const event = payload
        ? new CustomEvent(eventName, { detail: payload })
        : new CustomEvent(eventName);
      targetDocument?.dispatchEvent(event);
    },
    [targetDocument]
  );

  const subscribe = React.useCallback(
    <T extends EventType>(
      event: T,
      handler: (payload: PayloadDefinition[T]) => void
    ) => {
      if (!controller.current) {
        controller.current = new AbortController();
      }

      const eventHandler = createEventHandler(handler);

      targetDocument?.addEventListener(event, eventHandler, {
        signal: controller.current.signal,
      });

      return () => {
        targetDocument?.removeEventListener(event, eventHandler);
      };
    },
    [targetDocument]
  );

  const abort = React.useCallback(() => {
    if (controller.current) {
      controller.current.abort();
    }
  }, []);

  const reset = React.useCallback(() => {
    abort();
    controller.current = new AbortController();
  }, [abort]);

  React.useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return { dispatch, subscribe, reset, abort };
}
