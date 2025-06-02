import * as React from 'react';
import {
  getIntrinsicElementProps,
  slot,
  useFluent,
  useTimeout,
} from '@fluentui/react-components';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { EXIT_KEYS, EVENTS, ACTIONS } from '../../constants';
import type { KeytipWithId } from '../Keytip/internal/Keytip.types';
import { Keytip } from '../Keytip';
import { useEventService } from '../../hooks/useEventService';
import {
  sequencesToID,
  isDisabled,
  isTargetVisible,
} from '../../utilities/index';
import { useTree } from '../../hooks/useTree';
import type { KeytipTreeNode } from '../../hooks/useTree';
import type { Hotkey } from '../../hooks/useHotkeys';
import { useKeytipsState } from './useKeytipsState';
import { useIsMacOS } from '../../hooks/useIsMacOS';

/**
 * Create the state required to render Keytips.
 * @param props - props from this instance of Keytips.
 */
export const useKeytips_unstable = (props: KeytipsProps): KeytipsState => {
  const { targetDocument } = useFluent();
  const isMac = useIsMacOS();

  const {
    content = isMac ? 'Alt Control' : 'Alt Meta',
    startSequence = isMac ? 'alt+control' : 'alt+meta',
    exitSequence = 'alt+escape',
    returnSequence = 'escape',
    onEnterKeytipsMode,
    onExitKeytipsMode,
    invokeEvent = 'keydown',
    startDelay = 0,
  } = props;
  const { subscribe, dispatch: dispatchEvent, reset } = useEventService();
  const [state, dispatch] = useKeytipsState();
  const tree = useTree();
  const [setShortcutTimeout, clearShortcutTimeout] = useTimeout();

  const showKeytips = React.useCallback((ids: string[]) => {
    dispatch({ type: ACTIONS.SET_VISIBLE_KEYTIPS, ids, targetDocument });
  }, []);

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!state.inKeytipMode) {
        tree.currentKeytip.current = tree.root;
        dispatch({ type: ACTIONS.ENTER_KEYTIP_MODE });
        onEnterKeytipsMode?.(ev, { event: ev, type: invokeEvent });
        showKeytips(tree.getChildren());
      } else {
        dispatch({ type: ACTIONS.EXIT_KEYTIP_MODE });
        showKeytips([]);
      }
    },
    [onEnterKeytipsMode, state.inKeytipMode]
  );

  const handleExitKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (state.inKeytipMode) {
        tree.currentKeytip.current = undefined;
        dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
        dispatch({ type: ACTIONS.EXIT_KEYTIP_MODE });
        onExitKeytipsMode?.(ev, { event: ev, type: invokeEvent });
        showKeytips([]);
      }
    },
    [state.inKeytipMode, onExitKeytipsMode]
  );

  const handleReturnSequence = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!state.inKeytipMode) return;
      const currentKeytip = tree.currentKeytip.current;

      if (currentKeytip && currentKeytip.target) {
        currentKeytip?.onReturn?.(ev, {
          event: ev,
          type: invokeEvent,
          targetElement: currentKeytip.target,
        });
      }

      dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
      tree.getBack();
      showKeytips(tree.getChildren());
      if (tree.currentKeytip.current === undefined) {
        handleExitKeytipMode(ev);
      }
    },
    [state.inKeytipMode]
  );

  const exitSequences = state.inKeytipMode ? [...EXIT_KEYS, exitSequence] : [];

  useHotkeys(
    [
      [startSequence, handleEnterKeytipMode, { delay: startDelay }],
      [returnSequence, handleReturnSequence],
      ...exitSequences.map((key) => [key, handleExitKeytipMode] as Hotkey),
    ],
    { invokeEvent }
  );

  const handleKeytipAdded = React.useCallback(
    (keytip: KeytipWithId) => {
      tree.addNode(keytip);

      dispatch({
        type: ACTIONS.ADD_KEYTIP,
        keytip,
      });

      const { current: currentKeytip } = tree.currentKeytip;

      if (!currentKeytip) return;

      if (state.inKeytipMode && tree.isCurrentKeytipParent(keytip)) {
        showKeytips(tree.getChildren());
      }
    },
    [state.inKeytipMode]
  );

  const handleKeytipRemoved = React.useCallback((keytip: KeytipWithId) => {
    tree.removeNode(keytip.uniqueId);
    dispatch({ type: ACTIONS.REMOVE_KEYTIP, id: keytip.uniqueId });
  }, []);

  const handleKeytipUpdated = React.useCallback((keytip: KeytipWithId) => {
    tree.updateNode(keytip);
    dispatch({ type: ACTIONS.UPDATE_KEYTIP, keytip });
    showKeytips(tree.getChildren());
  }, []);

  const handleDismiss = React.useCallback(
    (ev: Event) => {
      if (state.inKeytipMode) {
        handleExitKeytipMode(ev as KeyboardEvent);
      }
    },
    [state.inKeytipMode]
  );

  React.useLayoutEffect(() => {
    subscribe(EVENTS.KEYTIP_ADDED, handleKeytipAdded);
    subscribe(EVENTS.KEYTIP_UPDATED, handleKeytipUpdated);
    subscribe(EVENTS.KEYTIP_REMOVED, handleKeytipRemoved);
    subscribe(EVENTS.ENTER_KEYTIP_MODE, handleEnterKeytipMode);

    return () => {
      reset();
    };
  }, [
    reset,
    handleKeytipAdded,
    handleKeytipUpdated,
    handleKeytipRemoved,
    handleEnterKeytipMode,
  ]);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    targetDocument?.addEventListener('mousedown', handleDismiss, { signal });
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
  }, [targetDocument, handleDismiss]);

  const handleKeytipExecution = React.useCallback(
    (ev: KeyboardEvent, node: KeytipTreeNode) => {
      tree.currentKeytip.current = node;

      if (node.target && !isDisabled(node.target)) {
        node.onExecute?.(ev, {
          event: ev,
          type: invokeEvent,
          targetElement: node.target,
        });

        dispatchEvent(EVENTS.KEYTIP_EXECUTED, node);
      }

      const currentChildren = tree.getChildren(node);
      const shouldExitKeytipMode =
        currentChildren.length === 0 && !(node.dynamic || node.hasMenu);

      if (shouldExitKeytipMode) {
        handleExitKeytipMode(ev);
      } else {
        showKeytips(currentChildren);
      }
      // reset the sequence
      dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
    },
    [handleExitKeytipMode]
  );

  const handleShortcutExecution = React.useCallback(
    (ev: KeyboardEvent, node: KeytipTreeNode) => {
      clearShortcutTimeout();

      if (!node.overflowSequence || node.overflowSequence.length === 0) return;

      const overflowId = sequencesToID(node.overflowSequence);

      if (overflowId) {
        const overflowKeytip = tree.getNode(overflowId);

        if (overflowKeytip?.target && node.hasMenu) {
          handleKeytipExecution(ev, overflowKeytip);

          setShortcutTimeout(() => {
            const shortcutNode = tree.getNode(
              sequencesToID([
                ...overflowKeytip.keySequences,
                ...node.keySequences.slice(-1),
              ])
            );

            if (shortcutNode?.target) {
              handleKeytipExecution(ev, shortcutNode);
            }
          }, 0);
        } else {
          node?.onExecute?.(ev, {
            event: ev,
            type: invokeEvent,
            targetElement: node.target,
          });
        }
      }
    },
    [handleKeytipExecution]
  );

  const handlePartiallyMatchedNodes = React.useCallback((sequence: string) => {
    const partialNodes = tree.getPartiallyMatched(sequence);
    if (partialNodes && partialNodes.length > 0) {
      // We found nodes that partially match the sequence, so we show only those
      const ids = partialNodes.map((n) => n?.uniqueId || '');
      showKeytips(ids);
      dispatch({ type: ACTIONS.SET_SEQUENCE, value: sequence });
    }
  }, []);

  React.useEffect(() => {
    if (!targetDocument || !state.inKeytipMode) return;

    const handleInvokeEvent = (ev: KeyboardEvent) => {
      ev.stopPropagation();

      const { key } = parseHotkey(ev.key.toLowerCase());
      const currSeq = state.currentSequence + key?.toLowerCase();
      const node = tree.getMatchingNode(currSeq);

      if (node) {
        if (isTargetVisible(node.target, targetDocument?.defaultView)) {
          handleKeytipExecution(ev, node);
        } else {
          // try to find shortcut node
          handleShortcutExecution(ev, node);
        }
      } else {
        // if we don't have a match, we have to check if the sequence is a partial match
        handlePartiallyMatchedNodes(currSeq);
      }
    };

    targetDocument?.addEventListener(invokeEvent, handleInvokeEvent);
    return () => {
      targetDocument?.removeEventListener(invokeEvent, handleInvokeEvent);
      clearShortcutTimeout();
    };
  }, [
    state.inKeytipMode,
    state.currentSequence,
    handleExitKeytipMode,
    handlePartiallyMatchedNodes,
    handleKeytipExecution,
  ]);

  const keytips = Object.entries(state.keytips)
    .filter(([, { visible, visibleInternal }]) => visible || visibleInternal)
    .map(([keytipId, keytipProps]) => (
      <Keytip key={keytipId} {...keytipProps} />
    ));

  return {
    components: {
      root: 'div',
    },
    content,
    mountNode: props.mountNode,
    keytips,
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
      }),
      { elementType: 'div' }
    ),
  };
};
