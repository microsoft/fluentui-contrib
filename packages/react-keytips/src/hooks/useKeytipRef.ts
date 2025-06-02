import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import { useEventService } from './useEventService';
import { EVENTS, KTP_ROOT_ID } from '../constants';
import { usePrevious } from '@fluentui/react-utilities';
import type { KeytipProps } from '../components/Keytip';
import { sequencesToID } from '../utilities/index';

const isEqualArray = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const useKeytipRef = <
  T extends HTMLElement = HTMLButtonElement | HTMLAnchorElement
>({
  content,
  ...keytip
}: KeytipProps): React.Dispatch<React.SetStateAction<T | null>> => {
  const { targetDocument } = useFluent();
  const [node, setNode] = React.useState<T | null>(null);
  const { dispatch } = useEventService();
  const uniqueId = React.useId();
  const isPrimitiveContent = typeof content === 'string';

  const keySequences = keytip.keySequences.map((k) =>
    // according to spec sequence should have max 3 chars length
    k.substring(0, 3).toLowerCase()
  );

  const truncated = isPrimitiveContent ? content.substring(0, 3) : content;
  const id = sequencesToID(keySequences);

  const ktp = React.useMemo(
    () => ({
      ...keytip,
      content: truncated,
      id,
      uniqueId: keytip.uniqueId || uniqueId,
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
    // if content is empty string do not add the keytip
    if (isPrimitiveContent && content.length === 0) return;

    if (node) {
      const root = targetDocument?.getElementById(KTP_ROOT_ID);
      const startSequence = root?.getAttribute('data-start-shortcut');
      node.setAttribute(
        'aria-keyshortcuts',
        `${[startSequence, ...keySequences].join('+')}`
      );
    }

    dispatch(EVENTS.KEYTIP_ADDED, ktp);
    return () => {
      dispatch(EVENTS.KEYTIP_REMOVED, ktp);
    };
  }, [node]);

  return setNode;
};
