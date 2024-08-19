import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-components';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { EVENTS } from '../../constants';
import { useFluent } from '@fluentui/react-components';
import type { KeytipProps, KeytipWithId } from '../Keytip';
import { Keytip } from '../Keytip';
import { useEventService } from '../../hooks/useEventService';
import { sequencesToID, isTargetVisible } from '../../utilities';
import { useTree } from '../../hooks/useTree';

type Keytips = Record<string, KeytipProps & { visibleInternal?: boolean }>;

/**
 * Create the state required to render Keytips.
 * @param props - props from this instance of Keytips.
 */
export const useKeytips_unstable = (props: KeytipsProps): KeytipsState => {
  const { targetDocument } = useFluent();
  const {
    startSequence = 'alt+meta',
    exitSequence = 'alt+escape',
    returnSequence = 'escape',
    onEnterKeytipsMode,
    onExitKeytipsMode,
  } = props;
  const [inKeytipMode, setInKeytipMode] = React.useState(false);
  const [keytips, setKeytips] = React.useState<Keytips>({});
  const { subscribe } = useEventService();
  const currentSequence = React.useRef('');
  const tree = useTree();

  const showKeytips = React.useCallback((ids: string[]) => {
    const updatedKeytips = (ktps: Keytips) =>
      Object.entries(ktps).reduce<Keytips>((acc, [id, keytip]) => {
        acc[id] = {
          ...keytip,
          visibleInternal: ids.includes(id) && !!keytip?.positioning?.target,
        };
        return acc;
      }, {});

    setKeytips(updatedKeytips);
  }, []);

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!inKeytipMode) {
        tree.currentKeytip.current = tree.root;
        setInKeytipMode(true);
        onEnterKeytipsMode?.(ev, { event: ev, type: 'keydown' });
        showKeytips(tree.getChildren());
      } else {
        setInKeytipMode(false);
        showKeytips([]);
      }
    },
    [showKeytips, inKeytipMode, onEnterKeytipsMode]
  );

  const handleExitKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (inKeytipMode) {
        tree.currentKeytip.current = tree.root;
        currentSequence.current = '';
        setInKeytipMode(false);
        onExitKeytipsMode?.(ev, { event: ev, type: 'keydown' });
        showKeytips([]);
      }
    },
    [inKeytipMode, onExitKeytipsMode]
  );

  const handleReturnSequence = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!inKeytipMode) {
        return;
      }

      const currentKeytip = tree.currentKeytip?.current;
      if (currentKeytip && currentKeytip.target) {
        if (currentKeytip.target) {
          currentKeytip?.onReturn?.(ev, {
            event: ev,
            type: 'keydown',
            targetElement: currentKeytip.target,
          });
        }
      }
      currentSequence.current = '';
      tree.getBack();
      showKeytips(tree.getChildren());
      if (tree.currentKeytip.current === undefined) {
        setInKeytipMode(false);
      }
    },
    [inKeytipMode]
  );

  useHotkeys([
    [startSequence, handleEnterKeytipMode],
    [returnSequence, handleReturnSequence],
    [exitSequence, handleExitKeytipMode],
    ['tab', handleExitKeytipMode],
    ['enter', handleExitKeytipMode],
    ['space', handleExitKeytipMode],
  ]);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const handleKeytipAdded = (keytip: KeytipWithId) => {
      tree.addNode(keytip);
      setKeytips((prev) => ({
        ...prev,
        [keytip.uniqueId]: {
          ...keytip,
          id: sequencesToID(keytip.keySequences),
        },
      }));

      if (tree.isCurrentKeytipParent(keytip)) {
        showKeytips(tree.getChildren());
      }
    };

    const handleKeytipRemoved = (keytip: KeytipWithId) => {
      tree.removeNode(keytip);
      setKeytips((prev) => {
        const newKeytips = { ...prev };
        delete newKeytips[keytip.uniqueId];
        return newKeytips;
      });
    };

    const handleKeytipUpdated = (keytip: KeytipWithId) => {
      tree.updateNode(keytip);
      setKeytips((prev) => ({
        ...prev,
        [keytip.uniqueId]: {
          ...keytip,
          id: sequencesToID(keytip.keySequences),
        },
      }));
    };

    subscribe(EVENTS.KEYTIP_ADDED, handleKeytipAdded, signal);
    subscribe(EVENTS.KEYTIP_UPDATED, handleKeytipUpdated, signal);
    subscribe(EVENTS.KEYTIP_REMOVED, handleKeytipRemoved, signal);
    return () => {
      controller.abort();
    };
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const handleDismiss = (ev: Event) => {
      if (inKeytipMode) {
        handleExitKeytipMode(ev as KeyboardEvent);
      }
    };

    targetDocument?.addEventListener('mouseup', handleDismiss, { signal });
    targetDocument?.defaultView?.addEventListener('resize', handleDismiss, {
      signal,
    });
    targetDocument?.defaultView?.addEventListener('scroll', handleDismiss, {
      signal,
    });

    return () => {
      controller.abort();
    };
  }, [targetDocument, inKeytipMode, handleExitKeytipMode]);

  React.useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      if (inKeytipMode) {
        const { key } = parseHotkey(ev.key.toLowerCase());
        const currSeq = currentSequence.current + key?.toLowerCase();
        const node = tree.getMatchingNode(currSeq);

        if (node) {
          tree.currentKeytip.current = node;
          const currentKtpChildren = tree.getChildren(node);
          if (node.target) {
            node.onExecute?.(ev, {
              event: ev,
              type: 'keydown',
              targetElement: node.target,
            });
          }
          // To exit keytipMode after executing the keytip it must not have a menu or have dynamic children
          if (currentKtpChildren.length === 0 && !node.hasDynamicChildren) {
            handleExitKeytipMode(ev);
          } else {
            // show all children keytips
            showKeytips(currentKtpChildren);
          }

          currentSequence.current = '';
          return;
        }

        // if we don't have a match, we have to check if the sequence is a partial match
        const partialNodes = tree.getPartiallyMatched(currSeq);
        if (partialNodes && partialNodes.length > 0) {
          // We found nodes that partially match the sequence, so we show only those
          const ids = partialNodes.map((n) => (n ? n.uniqueId : ''));
          showKeytips(ids);
          // Save currentSequence
          currentSequence.current = currSeq;
        }
      }
    };

    targetDocument?.addEventListener('keydown', handleKeyDown);
    return () => {
      targetDocument?.removeEventListener('keydown', handleKeyDown);
    };
  }, [inKeytipMode, handleExitKeytipMode]);

  const visibleKeytips = Object.entries(keytips)
    .filter(([, { visible, visibleInternal }]) => visible || visibleInternal)
    .map(([keytipId, keytipProps]) => (
      <Keytip key={keytipId} {...keytipProps} />
    ));

  const hiddenKeytips = Object.values(keytips).map(({ keySequences }) => (
    <span
      key={sequencesToID(keySequences)}
      id={sequencesToID(keySequences)}
      style={VISUALLY_HIDDEN_STYLES}
    >
      {keySequences.join(', ')}
    </span>
  ));

  return {
    components: {
      root: 'div',
    },
    mountNode: props.mountNode,
    keytips: hiddenKeytips,
    visibleKeytips,
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
      }),
      { elementType: 'div' }
    ),
  };
};
