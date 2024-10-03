import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import { usePrevious } from '@fluentui/react-utilities';
import type { KeytipProps } from '../components/Keytip';

const isEqualArray = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const useKeytipRef = <
  T extends HTMLElement = HTMLButtonElement | HTMLAnchorElement
>(
  keytip: Omit<KeytipProps, 'uniqueId'>
): React.Dispatch<React.SetStateAction<T | null>> => {
  const uniqueId = React.useId();
  const [node, setNode] = React.useState<T | null>(null);
  const { dispatch } = useEventService();

  const ktp = React.useMemo(
    () => ({
      ...keytip,
      uniqueId,
      positioning: {
        target: node,
        ...keytip.positioning,
      },
    }),
    [keytip, uniqueId, node]
  );

  const prevKeytip = usePrevious(ktp);

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

  return setNode;
};
