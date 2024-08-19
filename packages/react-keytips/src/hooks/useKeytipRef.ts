import * as React from 'react';
import { DATAKTP_TARGET } from '../constants';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import {
  useIsomorphicLayoutEffect,
  usePrevious,
} from '@fluentui/react-utilities';
import { sequencesToID } from '../utilities/sequencesToID';
import type { KeytipProps } from '../components/Keytip';

const isEqualArray = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const useKeytipRef = <T extends HTMLElement = HTMLButtonElement>(
  keytip: KeytipProps
) => {
  const { dispatch } = useEventService();

  const prevKeytip = usePrevious(keytip);

  const setRef = React.useCallback(
    (node?: T) => {
      if (node) {
        const id = sequencesToID(keytip.keySequences);
        node.setAttribute(DATAKTP_TARGET, id);
      }
    },
    [keytip.keySequences]
  ) as React.Ref<T>;

  useIsomorphicLayoutEffect(() => {
    if (prevKeytip) {
      if (!isEqualArray(prevKeytip.keySequences, keytip.keySequences)) {
        dispatch(EVENTS.KEYTIP_UPDATED, keytip);
      }
    }
  });

  useIsomorphicLayoutEffect(() => {
    dispatch(EVENTS.KEYTIP_ADDED, keytip);

    return () => {
      dispatch(EVENTS.KEYTIP_REMOVED, keytip);
    };
  }, []);

  return setRef;
};
