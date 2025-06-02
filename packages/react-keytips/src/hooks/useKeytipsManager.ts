import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import type { KeytipProps } from '../Keytip';

export function useKeytipsManager() {
  const { dispatch } = useEventService();
  const id = React.useId();

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
  }, []);

  const update = React.useCallback(
    (keytip: KeytipProps & { uniqueId: string }) => {
      dispatch(EVENTS.KEYTIP_UPDATED, keytip);
    },
    []
  );

  const unregister = React.useCallback(
    (keytip: KeytipProps & { uniqueId: string }) => {
      dispatch(EVENTS.KEYTIP_REMOVED, keytip);
    },
    []
  );

  return {
    enterKeytipMode,
    exitKeytipMode,
    update,
    register,
    unregister,
  };
}
