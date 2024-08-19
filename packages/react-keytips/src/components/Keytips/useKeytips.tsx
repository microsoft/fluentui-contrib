import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { EVENTS } from '../../constants';
import { useFluent } from '@fluentui/react-components';
import type { KeytipProps } from '../Keytip';
import { Keytip } from '../Keytip';
import { useEventService } from '../../hooks/useEventService';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { keytipTargetFromSequence, sequencesToID } from '../../utilities';
import { useTree } from '../../hooks/useTree';

/**
 * Create the state required to render Keytips.
 * @param props - props from this instance of Keytips.
 */
export const useKeytips_unstable = (props: KeytipsProps): KeytipsState => {
  const { targetDocument } = useFluent();
  const {
    startSequence = 'alt+control',
    returnSequence = 'escape',
    // exitSequence = 'alt+control',
    onEnterKeytipsMode,
    onExitKeytipsMode,
  } = props;
  const [inKeytipMode, setInKeytipMode] = React.useState(false);
  const [keytips, setKeytips] = React.useState<Record<string, KeytipProps>>({});
  const currentSequence = React.useRef('');
  const tree = useTree();
  const { subscribe, unsubscribe } = useEventService();

  const showKeytips = React.useCallback(
    (ids: string[]) => {
      const updatedKeytips = Object.entries(keytips).reduce<
        Record<string, KeytipProps>
      >((acc, [id, keytip]) => {
        acc[id] = {
          ...keytip,
          visible: ids.includes(sequencesToID(keytip.keySequences)),
        };
        return acc;
      }, {});
      setKeytips(updatedKeytips);
    },
    [keytips]
  );

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      tree.currentKeytip.current = tree.root;
      setInKeytipMode(true);
      onEnterKeytipsMode?.(ev, { event: ev, type: 'keydown' });
      showKeytips(tree.getChildren());
    },
    [showKeytips, onEnterKeytipsMode, tree]
  );

  const handleExitKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      tree.currentKeytip.current = tree.root;
      currentSequence.current = '';
      setInKeytipMode(false);
      onExitKeytipsMode?.(ev, { event: ev, type: 'keydown' });
      showKeytips([]);
    },
    [showKeytips, onExitKeytipsMode, tree]
  );

  const handleReturnSequence = React.useCallback(
    (ev: KeyboardEvent) => {
      const currentKeytip = tree.currentKeytip?.current;
      if (currentKeytip) {
        const id = keytipTargetFromSequence(currentKeytip.keySequences);
        const targetElement = targetDocument?.querySelector(id) as HTMLElement;
        if (targetElement) {
          currentKeytip?.onReturn?.(ev, {
            event: ev,
            type: 'keydown',
            targetElement,
          });
        }
      }
      currentSequence.current = '';
      tree.getBack();
      showKeytips(tree.getChildren());
    },
    [targetDocument, tree, showKeytips]
  );

  // Enter keytip mode
  // TODO: improve the hook and exit sequences
  useHotkeys([
    [startSequence, handleEnterKeytipMode],
    [returnSequence, handleReturnSequence],
    // [exitSequence, handleExitKeytipMode],
    ['tab', handleExitKeytipMode],
    ['enter', handleExitKeytipMode],
    ['space', handleExitKeytipMode],
  ]);

  // useHotkeys([...EXIT_KEYS, exitSequence].map(key => [key, handleExitKeytipMode]));

  useIsomorphicLayoutEffect(() => {
    const onKeytipAdded = (keytip: KeytipProps) => {
      tree.addNode(keytip);
      setKeytips((prev) => ({
        ...prev,
        [sequencesToID(keytip.keySequences)]: keytip,
      }));
    };

    // const onKeytipRemoved = (keytip: KeytipProps) => {
    //   // tree.removeNode(keytip);
    //   // setKeytips(prev => {
    //   //   const newKeytips = { ...prev };
    //   //   delete newKeytips[sequencesToID(keytip.keySequences).toLowerCase()];
    //   //   return newKeytips;
    //   // });
    // };

    const onKeytipUpdated = (keytip: KeytipProps) => {
      tree.updateNode(keytip);
      setKeytips((prev) => ({
        ...prev,
        [sequencesToID(keytip.keySequences)]: keytip,
      }));
    };

    subscribe(EVENTS.KEYTIP_ADDED, onKeytipAdded);
    subscribe(EVENTS.KEYTIP_UPDATED, onKeytipUpdated);
    // subscribe(EVENTS.KEYTIP_REMOVED, onKeytipRemoved);
    return () => {
      unsubscribe(EVENTS.KEYTIP_ADDED, onKeytipAdded);
      unsubscribe(EVENTS.KEYTIP_UPDATED, onKeytipUpdated);
      // unsubscribe(EVENTS.KEYTIP_REMOVED, onKeytipRemoved);
    };
  }, [subscribe, unsubscribe, tree]);

  React.useEffect(() => {
    const handleDismiss = (ev: Event) => {
      if (inKeytipMode) {
        handleExitKeytipMode(ev as KeyboardEvent);
      }
    };

    const addEventListeners = () => {
      targetDocument?.addEventListener('mouseup', handleDismiss);
      targetDocument?.defaultView?.addEventListener('resize', handleDismiss);
      targetDocument?.defaultView?.addEventListener('scroll', handleDismiss);
    };

    const removeEventListeners = () => {
      targetDocument?.removeEventListener('mouseup', handleDismiss);
      targetDocument?.defaultView?.removeEventListener('resize', handleDismiss);
      targetDocument?.defaultView?.removeEventListener('scroll', handleDismiss);
    };

    addEventListeners();
    return removeEventListeners;
  }, [targetDocument, inKeytipMode, handleExitKeytipMode]);

  React.useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      if (inKeytipMode) {
        const { key } = parseHotkey(ev.key.toLowerCase());
        const currSeq = currentSequence.current + key?.toLowerCase();
        const node = tree.getMatchingNode(currSeq);
        if (node) {
          const currentKtpChildren = tree.getChildren();
          tree.currentKeytip.current = node;
          const id = keytipTargetFromSequence(node.keySequences);
          const executeTarget = targetDocument?.querySelector(
            id
          ) as HTMLElement;
          if (executeTarget) {
            node.onExecute?.(ev, {
              event: ev,
              type: 'keydown',
              targetElement: executeTarget,
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
          const ids = partialNodes.map((n) => (n ? n.id : ''));
          showKeytips(ids);
          // Save currentSequence
          currentSequence.current = currSeq;
        }
      }

      ev.preventDefault();
      ev.stopPropagation();
    };

    targetDocument?.addEventListener('keypress', handleKeyPress);
    return () => {
      targetDocument?.removeEventListener('keypress', handleKeyPress);
    };
  }, [targetDocument, inKeytipMode, showKeytips, tree, handleExitKeytipMode]);

  const keytipsToRender = React.useMemo(() => {
    return Object.entries(keytips).map(([keytipId, keytipProps]) => (
      <Keytip key={keytipId} {...keytipProps} />
    ));
  }, [keytips]);

  return {
    components: {
      root: 'div',
    },
    keytips: keytipsToRender,
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
      }),
      { elementType: 'div' }
    ),
  };
};
