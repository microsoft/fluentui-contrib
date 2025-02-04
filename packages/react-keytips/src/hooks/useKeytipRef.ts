import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import { usePrevious } from '@fluentui/react-utilities';
import type { KeytipProps } from '../components/Keytip';
import { sequencesToID } from '../utilities/index';

const isEqualArray = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const useKeytipRef = <
  T extends HTMLElement = HTMLButtonElement | HTMLAnchorElement
>({
  ...keytip
}: KeytipProps): React.Dispatch<React.SetStateAction<T | null>> => {
  const [node, setNode] = React.useState<T | null>(null);
  const { dispatch } = useEventService();

  const uniqueId = React.useId();
  const keySequences = keytip.keySequences.map((k) =>
    // according to spec sequence should have max 3 chars length
    k.substring(0, 3).toLowerCase()
  );

  const id = sequencesToID(keySequences);

  const ktp = React.useMemo(
    () => ({
      ...keytip,
      id,
      uniqueId,
      keySequences,
      positioning: {
        target: node,
        ...keytip.positioning,
      },
    }),
    [keytip, node]
  );

  const prevKeytip = usePrevious(keytip);

  // this will run on every render, in order to update the keytip if the keySequences change
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
