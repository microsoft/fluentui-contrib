import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import { usePrevious } from '@fluentui/react-utilities';
import type { KeytipProps } from '../components/Keytip';

const isEqualArray = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const useKeytipRef = <T extends HTMLElement = HTMLButtonElement>(
  keytip: Omit<KeytipProps, 'uniqueId'>
) => {
  const uniqueId = React.useId();

  const [node, setNode] = React.useState<T | undefined>();
  const { dispatch } = useEventService();

  const ktp = {
    ...keytip,
    uniqueId,
    positioning: {
      target: node,
      ...keytip.positioning,
    },
  };

  const prevKeytip = usePrevious(ktp);

  const setRef = React.useCallback(
    (node?: T) => {
      setNode(node);
    },
    [keytip.keySequences]
  ) as React.Ref<T>;

  React.useEffect(() => {
    if (prevKeytip) {
      if (!isEqualArray(prevKeytip.keySequences, ktp.keySequences)) {
        dispatch(EVENTS.KEYTIP_UPDATED, ktp);
      }
    }
  });

  React.useEffect(() => {
    dispatch(EVENTS.KEYTIP_ADDED, ktp);

    return () => {
      dispatch(EVENTS.KEYTIP_REMOVED, ktp);
    };
  }, [node]);

  return setRef;
};
