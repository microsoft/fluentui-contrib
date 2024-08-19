import { useCallback } from 'react';
import { useFluent } from '@fluentui/react-components';
import { EVENTS } from '../constants';
import type { KeytipWithId } from '../components/Keytip';

type EventType = (typeof EVENTS)[keyof typeof EVENTS];

type PayloadDefinition = {
  [EVENTS.ENTER_KEYTIP_MODE]: { inKeytipMode: boolean };
  [EVENTS.EXIT_KEYTIP_MODE]: { inKeytipMode: boolean };
  [EVENTS.KEYTIP_UPDATED]: KeytipWithId;
  [EVENTS.KEYTIP_ADDED]: KeytipWithId;
  [EVENTS.KEYTIP_REMOVED]: KeytipWithId;
};

function isCustomEvent(event: Event): event is CustomEvent {
  return 'detail' in event;
}

export function useEventService() {
  const { targetDocument } = useFluent();

  const dispatch = useCallback(
    <T extends EventType>(eventName: T, payload?: PayloadDefinition[T]) => {
      const event = payload
        ? new CustomEvent(eventName, { detail: payload })
        : new CustomEvent(eventName);
      targetDocument?.dispatchEvent(event);
    },
    [targetDocument]
  );

  const subscribe = useCallback(
    <T extends EventType>(
      event: T,
      handler: (payload: PayloadDefinition[T]) => void,
      signal?: AbortSignal
    ) => {
      const eventHandler = (ev: Event) => {
        if (isCustomEvent(ev)) {
          const eventPayload = ev.detail;
          handler(eventPayload);
        }
      };

      targetDocument?.addEventListener(event, eventHandler, { signal });
    },
    [targetDocument]
  );

  const unsubscribe = useCallback(
    <T extends EventType>(
      event: T,
      handler: (payload: PayloadDefinition[T]) => void
    ) => {
      const eventHandler = (ev: Event) => {
        if (isCustomEvent(ev)) {
          const eventPayload = ev.detail;
          handler(eventPayload);
        }
      };

      targetDocument?.removeEventListener(event, eventHandler);
    },
    [targetDocument]
  );

  return { dispatch, subscribe, unsubscribe };
}
