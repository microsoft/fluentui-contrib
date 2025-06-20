import * as React from 'react';
import {
  getIntrinsicElementProps,
  slot,
  useFluent,
  useTimeout,
} from '@fluentui/react-components';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import type { KeytipProps } from '../Keytip';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { EXIT_KEYS, EVENTS } from '../../constants';
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
import { useIsMacOS } from '../../hooks/useIsMacOS';

type Keytips = Record<
  string,
  KeytipProps & {
    visibleInternal?: boolean;
    uniqueId: string;
  }
>;

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

  const tree = useTree();
  const [setShortcutTimeout, clearShortcutTimeout] = useTimeout();
  const { subscribe, dispatch: dispatchEvent, reset } = useEventService();
  const [, forceRender] = React.useReducer((x) => x + 1, 0);

  const inKeytipMode = React.useRef(false);
  const currentSequence = React.useRef('');
  const keytips = React.useRef<Keytips>({});

  const showKeytips = React.useCallback(
    (ids: string[]) => {
      // Update keytips and trigger re-rerender
      keytips.current = Object.fromEntries(
        Object.entries(keytips.current).map(([key, kt]) => {
          const isVisible =
            ids.includes(key) &&
            isTargetVisible(
              kt.positioning?.target as HTMLElement,
              targetDocument?.defaultView
            );
          return [
            key,
            {
              ...kt,
              visibleInternal: isVisible,
            },
          ];
        })
      );
      forceRender();
    },
    [targetDocument]
  );

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!inKeytipMode.current) {
        tree.currentKeytip.current = tree.root;
        inKeytipMode.current = true;
        onEnterKeytipsMode?.(ev, { event: ev, type: invokeEvent });
        showKeytips(tree.getChildren());
        forceRender();
      } else {
        inKeytipMode.current = false;
        showKeytips([]);
      }
    },
    [onEnterKeytipsMode, showKeytips, invokeEvent]
  );

  const handleExitKeytipMode = React.useCallback(
    (ev: Event) => {
      if (inKeytipMode.current) {
        tree.currentKeytip.current = undefined;
        currentSequence.current = '';
        inKeytipMode.current = false;

        onExitKeytipsMode?.(ev, {
          event: ev as KeyboardEvent,
          type: invokeEvent,
        });
        showKeytips([]);
      }
    },
    [onExitKeytipsMode, showKeytips, invokeEvent]
  );

  const handleReturnSequence = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!inKeytipMode.current) return;
      const currentKeytip = tree.currentKeytip.current;

      currentKeytip?.onReturn?.(ev, {
        event: ev,
        type: invokeEvent,
        targetElement: currentKeytip.target,
      });

      currentSequence.current = '';
      tree.getBack();
      showKeytips(tree.getChildren());

      if (!tree.currentKeytip.current) {
        handleExitKeytipMode(ev);
      }
    },
    [handleExitKeytipMode, showKeytips, invokeEvent]
  );

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

      const children = tree.getChildren(node);
      const shouldExit =
        children.length === 0 && !(node.dynamic || node.hasMenu);

      if (shouldExit) {
        handleExitKeytipMode(ev);
      } else {
        showKeytips(children);
      }

      currentSequence.current = '';
    },
    [dispatchEvent, showKeytips, handleExitKeytipMode, invokeEvent]
  );

  const handleShortcutExecution = React.useCallback(
    (ev: KeyboardEvent, node: KeytipTreeNode) => {
      clearShortcutTimeout();

      if (!node.overflowSequence?.length) return;

      const overflowId = sequencesToID(node.overflowSequence);
      const overflowNode = tree.getNode(overflowId);

      if (overflowNode?.target && node.hasMenu) {
        handleKeytipExecution(ev, overflowNode);

        setShortcutTimeout(() => {
          const shortcutNode = tree.getNode(
            sequencesToID([
              ...overflowNode.keySequences,
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
    },
    [handleKeytipExecution]
  );

  const handlePartiallyMatchedNodes = React.useCallback(
    (seq: string) => {
      const matches = tree.getPartiallyMatched(seq);
      if (matches?.length > 0) {
        const ids = matches.map((n) => n?.uniqueId || '');
        showKeytips(ids);
        currentSequence.current = seq;
      }
    },
    [showKeytips]
  );

  const handleKeytipAdded = React.useCallback(
    (keytip: KeytipWithId) => {
      tree.addNode(keytip);
      keytips.current[keytip.uniqueId] = keytip;

      if (inKeytipMode.current && tree.isCurrentKeytipParent(keytip)) {
        showKeytips(tree.getChildren());
      }
    },
    [showKeytips]
  );

  const handleKeytipUpdated = React.useCallback(
    (keytip: KeytipWithId) => {
      keytips.current[keytip.uniqueId] = {
        ...keytips.current[keytip.uniqueId],
        ...keytip,
      };
      tree.updateNode(keytip);
      showKeytips(tree.getChildren());
    },
    [showKeytips]
  );

  const handleKeytipRemoved = React.useCallback((uniqueId: string) => {
    delete keytips.current[uniqueId];
    tree.removeNode(uniqueId);
  }, []);

  const handleInvokeEvent = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!inKeytipMode.current) return;

      ev.stopPropagation();

      const { key } = parseHotkey(ev.key.toLowerCase());
      const sequence = currentSequence.current + key;
      const node = tree.getMatchingNode(sequence);

      if (node) {
        if (isTargetVisible(node.target, targetDocument?.defaultView)) {
          handleKeytipExecution(ev, node);
        } else {
          handleShortcutExecution(ev, node);
        }
      } else {
        handlePartiallyMatchedNodes(sequence);
      }
    },
    [
      handleKeytipExecution,
      handleShortcutExecution,
      handlePartiallyMatchedNodes,
      targetDocument,
    ]
  );

  React.useEffect(() => {
    if (!targetDocument) return;

    targetDocument.addEventListener(invokeEvent, handleInvokeEvent);

    return () => {
      targetDocument.removeEventListener(invokeEvent, handleInvokeEvent);
      clearShortcutTimeout();
    };
  }, [handleInvokeEvent, invokeEvent, targetDocument]);

  React.useEffect(() => {
    subscribe(EVENTS.KEYTIP_ADDED, handleKeytipAdded);
    subscribe(EVENTS.KEYTIP_UPDATED, handleKeytipUpdated);
    subscribe(EVENTS.KEYTIP_REMOVED, handleKeytipRemoved);
    subscribe(EVENTS.ENTER_KEYTIP_MODE, handleEnterKeytipMode);
    subscribe(EVENTS.EXIT_KEYTIP_MODE, handleExitKeytipMode);

    return reset;
  }, [
    reset,
    handleKeytipAdded,
    handleExitKeytipMode,
    handleKeytipUpdated,
    handleKeytipRemoved,
    handleEnterKeytipMode,
  ]);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const dismissHandler = (ev: Event) => handleExitKeytipMode(ev);

    targetDocument?.addEventListener('mousedown', dismissHandler, { signal });
    targetDocument?.addEventListener('mouseup', dismissHandler, { signal });
    targetDocument?.defaultView?.addEventListener('resize', dismissHandler, {
      signal,
    });
    targetDocument?.defaultView?.addEventListener('scroll', dismissHandler, {
      signal,
    });

    return () => controller.abort();
  }, [targetDocument, handleExitKeytipMode]);

  useHotkeys(
    [
      [startSequence, handleEnterKeytipMode, { delay: startDelay }],
      [returnSequence, handleReturnSequence],
      ...[...EXIT_KEYS, exitSequence].map(
        (key) => [key, handleExitKeytipMode] as Hotkey
      ),
    ],
    { invokeEvent }
  );

  const keytipsToRender = Object.entries(keytips.current)
    .filter(([, { visible, visibleInternal }]) => visible || visibleInternal)
    .map(([id, props]) => <Keytip key={id} {...props} />);

  return {
    components: { root: 'div' },
    content,
    mountNode: props.mountNode,
    keytips: keytipsToRender,
    root: slot.always(getIntrinsicElementProps('div', { ...props }), {
      elementType: 'div',
    }),
  };
};
