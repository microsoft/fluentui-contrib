import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import { useKeytipsManager } from './useKeytipsManager';
import { KTP_ROOT_ID } from '../constants';
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
  truncated = true,
  ...keytip
}: KeytipProps) => {
  const { targetDocument } = useFluent();
  const [node, setNode] = React.useState<T | null>(null);
  const { register, unregister, update } = useKeytipsManager();
  const uniqueId = React.useId();
  const isPrimitiveContent = typeof content === 'string';

  const keySequences = keytip.keySequences.map((k) =>
    // according to spec sequence should have max 3 chars length
    truncated ? k.substring(0, 3).toLowerCase() : k.toLowerCase()
  );

  const truncatedContent =
    isPrimitiveContent && truncated ? content.substring(0, 3) : content;
  const id = sequencesToID(keySequences);

  const ktp = React.useMemo(
    () => ({
      ...keytip,
      content: truncatedContent,
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
        update(ktp);
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

    register(ktp);
    return () => {
      unregister(ktp.uniqueId);
    };
  }, [node]);

  return setNode;
};
