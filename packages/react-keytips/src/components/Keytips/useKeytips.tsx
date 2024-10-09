import * as React from 'react';
import {
  getIntrinsicElementProps,
  slot,
  useFluent,
} from '@fluentui/react-components';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { EVENTS, VISUALLY_HIDDEN_STYLES, ACTIONS } from '../../constants';
import type { KeytipWithId } from '../Keytip';
import { Keytip } from '../Keytip';
import { useEventService } from '../../hooks/useEventService';
import { sequencesToID } from '../../utilities/index';
import { useTree } from '../../hooks/useTree';
import type { KeytipTreeNode } from '../../hooks/useTree';
import type { Hotkey } from '../../hooks/useHotkeys';
import { useKeytipsState } from './useKeytipsState';

/**
 * Create the state required to render Keytips.
 * @param props - props from this instance of Keytips.
 */
export const useKeytips_unstable = (props: KeytipsProps): KeytipsState => {
  const { targetDocument } = useFluent();
  const {
    content = 'Alt Meta',
    startSequence = 'alt+meta',
    exitSequence = 'alt+escape',
    returnSequence = 'escape',
    onEnterKeytipsMode,
    onExitKeytipsMode,
  } = props;
  const { subscribe, reset } = useEventService();
  const [state, dispatch] = useKeytipsState();
  const tree = useTree();

  const showKeytips = React.useCallback(
    (ids: string[]) =>
      dispatch({ type: ACTIONS.SET_VISIBLE_KEYTIPS, ids, targetDocument }),
    []
  );

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!state.inKeytipMode) {
        tree.currentKeytip.current = tree.root;
        dispatch({ type: ACTIONS.ENTER_KEYTIP_MODE });
        onEnterKeytipsMode?.(ev, { event: ev, type: 'keydown' });
        showKeytips(tree.getChildren());
      } else {
        dispatch({ type: ACTIONS.EXIT_KEYTIP_MODE });
        showKeytips([]);
      }
    },
    [state.inKeytipMode, onEnterKeytipsMode]
  );

  const handleExitKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (state.inKeytipMode) {
        tree.currentKeytip.current = tree.root;
        dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
        dispatch({ type: ACTIONS.EXIT_KEYTIP_MODE });
        onExitKeytipsMode?.(ev, { event: ev, type: 'keydown' });
        showKeytips([]);
      }
    },
    [state.inKeytipMode, onExitKeytipsMode]
  );

  const handleReturnSequence = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!state.inKeytipMode) return;
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

      dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
      tree.getBack();
      showKeytips(tree.getChildren());
      if (tree.currentKeytip.current === undefined) {
        dispatch({ type: ACTIONS.EXIT_KEYTIP_MODE });
      }
    },
    [state.inKeytipMode]
  );

  useHotkeys([
    [startSequence, handleEnterKeytipMode],
    [returnSequence, handleReturnSequence],
    ...[exitSequence, 'tab', 'enter', 'space'].map(
      (key) => [key, handleExitKeytipMode] as Hotkey
    ),
  ]);

  React.useEffect(() => {
    const handleKeytipAdded = (keytip: KeytipWithId) => {
      tree.addNode(keytip);

      dispatch({
        type: ACTIONS.ADD_KEYTIP,
        keytip,
      });

      if (tree.isCurrentKeytipParent(keytip)) {
        showKeytips(tree.getChildren());
      }
    };

    const handleKeytipRemoved = (keytip: KeytipWithId) => {
      tree.removeNode(keytip.uniqueId);
      dispatch({ type: ACTIONS.REMOVE_KEYTIP, id: keytip.uniqueId });
    };

    const handleKeytipUpdated = (keytip: KeytipWithId) => {
      tree.updateNode(keytip);
      dispatch({ type: ACTIONS.UPDATE_KEYTIP, keytip });
      showKeytips(tree.getChildren());
    };

    subscribe(EVENTS.KEYTIP_ADDED, handleKeytipAdded);
    subscribe(EVENTS.KEYTIP_UPDATED, handleKeytipUpdated);
    subscribe(EVENTS.KEYTIP_REMOVED, handleKeytipRemoved);

    return () => {
      reset();
    };
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const handleDismiss = (ev: Event) => {
      if (state.inKeytipMode) {
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
  }, [state.inKeytipMode, targetDocument, handleExitKeytipMode]);

  const handleMatchingNode = React.useCallback(
    (ev: KeyboardEvent, node: KeytipTreeNode) => {
      tree.currentKeytip.current = node;

      if (node.target) {
        node.onExecute?.(ev, {
          event: ev,
          type: 'keydown',
          targetElement: node.target,
        });
      }

      const currentChildren = tree.getChildren(node);
      const shouldExitKeytipMode =
        currentChildren.length === 0 && !node.dynamic;
      // To exit keytipMode after executing the keytip it must not have have dynamic children
      if (shouldExitKeytipMode) {
        handleExitKeytipMode(ev);
      } else {
        showKeytips(currentChildren);
      }

      dispatch({ type: ACTIONS.SET_SEQUENCE, value: '' });
    },
    []
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
    if (!targetDocument) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      if (!state.inKeytipMode) return;

      const { key } = parseHotkey(ev.key.toLowerCase());
      const currSeq = state.currentSequence + key?.toLowerCase();
      const node = tree.getMatchingNode(currSeq);

      if (node) {
        handleMatchingNode(ev, node);
        return;
      }
      // if we don't have a match, we have to check if the sequence is a partial match
      handlePartiallyMatchedNodes(currSeq);
    };

    targetDocument?.addEventListener('keydown', handleKeyDown);
    return () => {
      targetDocument?.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    state.inKeytipMode,
    state.currentSequence,
    handleExitKeytipMode,
    handlePartiallyMatchedNodes,
    handleMatchingNode,
  ]);

  const visibleKeytips = Object.entries(state.keytips)
    .filter(([, { visible, visibleInternal }]) => visible || visibleInternal)
    .map(([keytipId, keytipProps]) => (
      <Keytip key={keytipId} {...keytipProps} />
    ));

  const hiddenKeytips = Object.values(state.keytips).map(({ keySequences }) => (
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
    content,
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
