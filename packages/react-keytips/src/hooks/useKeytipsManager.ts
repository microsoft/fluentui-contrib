import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import type { KeytipProps } from '../Keytip';

export function useKeytipsManager() {
  const { dispatch, subscribe, reset } = useEventService();
  const id = React.useId();
  const keytips = React.useRef<Record<string, KeytipProps>>({});
  const isKeytipModeEnabled = React.useRef(false);

  React.useEffect(() => {
    subscribe(EVENTS.KEYTIP_ADDED, (keytip) => {
      keytips.current[keytip.uniqueId] = keytip;
    });

    subscribe(EVENTS.ENTER_KEYTIP_MODE, () => {
      isKeytipModeEnabled.current = true;
    });

    subscribe(EVENTS.EXIT_KEYTIP_MODE, () => {
      isKeytipModeEnabled.current = false;
    });

    return () => {
      reset();
    };
  }, []);

  const enterKeytipMode = React.useCallback(() => {
    dispatch(EVENTS.ENTER_KEYTIP_MODE);
  }, []);

  const exitKeytipMode = React.useCallback(() => {
    dispatch(EVENTS.EXIT_KEYTIP_MODE);
  }, []);

  const register = React.useCallback((keytip: KeytipProps) => {
    dispatch(EVENTS.KEYTIP_ADDED, {
      ...keytip,
      uniqueId: keytip.uniqueId || id,
    });

    return keytip.uniqueId || id;
  }, []);

  const update = React.useCallback(
    (keytip: KeytipProps & { uniqueId: string }) => {
      dispatch(EVENTS.KEYTIP_UPDATED, keytip);
    },
    []
  );

  const unregister = React.useCallback((uniqueId: string) => {
    dispatch(EVENTS.KEYTIP_REMOVED, uniqueId);
  }, []);

  return {
    enterKeytipMode,
    exitKeytipMode,
    update,
    register,
    unregister,
    getKeytips: () => keytips.current,
    getKeytipsModeStatus: () => isKeytipModeEnabled.current,
  };
}
