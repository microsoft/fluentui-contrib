import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import { EVENTS } from '../constants';
import type { KeytipWithId } from '../components/Keytip';
import type { KeytipTreeNode } from '../hooks/useTree';

type EventType = (typeof EVENTS)[keyof typeof EVENTS];

type PayloadDefinition = {
  [EVENTS.ENTER_KEYTIP_MODE]: { inKeytipMode: boolean };
  [EVENTS.EXIT_KEYTIP_MODE]: { inKeytipMode: boolean };
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

  const reset = React.useCallback(() => {
    if (controller.current) {
      controller.current.abort();
      controller.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return { dispatch, subscribe, reset };
}
