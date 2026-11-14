import * as React from 'react';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useFluent,
  useTimeout,
} from '@fluentui/react-components';
import type { KeytipsProps, KeytipsState } from './Keytips.types';
import type { KeytipProps } from '../Keytip';
import { useHotkeys, parseHotkey } from '../../hooks/useHotkeys';
import { isKeyMatchingKeyboardEvent } from '../../hooks/useHotkeys/isMatchingKeyboardEvent';
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
    activationModifier,
    enabled = true,
    content = activationModifier
      ? activationModifier[0].toUpperCase() + activationModifier.slice(1)
      : isMac
      ? 'Alt Control'
      : 'Alt Meta',
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
  const [setInputTimeout, clearInputTimeout] = useTimeout();
  const { subscribe, dispatch: dispatchEvent, reset } = useEventService();
  const [, forceRender] = React.useReducer((x) => x + 1, 0);

  const inKeytipMode = React.useRef(false);
  const currentSequence = React.useRef('');
  const keytips = React.useRef<Keytips>({});
  const gesture = React.useRef({
    held: false,
    consumeKeyUp: false,
    consecutive: false,
    aliasAllowed: false,
    aliasKey: '',
  });
  const pendingInput = React.useRef<KeyboardEvent>();
  const startSequences = React.useMemo(
    () => (Array.isArray(startSequence) ? startSequence : [startSequence]),
    [startSequence]
  );

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

  const handleExitKeytipMode = React.useCallback(
    (ev: Event) => {
      gesture.current.consecutive = false;
      gesture.current.aliasAllowed = false;
      pendingInput.current = undefined;
      clearInputTimeout();

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
    [onExitKeytipsMode, showKeytips, invokeEvent, clearInputTimeout]
  );

  const handleEnterKeytipMode = React.useCallback(
    (ev: KeyboardEvent) => {
      if (!enabled) return false;

      if (!inKeytipMode.current) {
        tree.currentKeytip.current = tree.root;
        currentSequence.current = '';
        inKeytipMode.current = true;
        onEnterKeytipsMode?.(ev, {
          event: ev,
          type: activationModifier ? 'keydown' : invokeEvent,
        });
        showKeytips(tree.getChildren());
        forceRender();
        return true;
      }

      handleExitKeytipMode(ev);
      return false;
    },
    [
      enabled,
      activationModifier,
      onEnterKeytipsMode,
      handleExitKeytipMode,
      showKeytips,
      invokeEvent,
    ]
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
        return true;
      }
      return false;
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
      if (pendingInput.current === ev) pendingInput.current = undefined;
      if (!enabled || !inKeytipMode.current) return;

      if (activationModifier) {
        if (
          ev.defaultPrevented ||
          ev.isComposing ||
          ev.altKey ||
          ev.ctrlKey ||
          ev.metaKey
        ) {
          handleExitKeytipMode(ev);
          return;
        }

        if (isKeyMatchingKeyboardEvent(parseHotkey(returnSequence), ev)) {
          ev.preventDefault();
          ev.stopPropagation();
          handleReturnSequence(ev);
          return;
        }

        if (
          [...EXIT_KEYS, exitSequence].some((sequence) =>
            isKeyMatchingKeyboardEvent(parseHotkey(sequence), ev)
          )
        ) {
          handleExitKeytipMode(ev);
          return;
        }

        if (isModifierKey(ev.key)) return;
      } else {
        ev.stopPropagation();
      }

      const { key } = parseHotkey(ev.key.toLowerCase());
      const sequence = currentSequence.current + key;
      const node = tree.getMatchingNode(sequence);

      if (node) {
        if (activationModifier) {
          ev.preventDefault();
          ev.stopPropagation();
        }
        if (isTargetVisible(node.target, targetDocument?.defaultView)) {
          handleKeytipExecution(ev, node);
        } else {
          handleShortcutExecution(ev, node);
        }
      } else {
        const matched = handlePartiallyMatchedNodes(sequence);
        if (activationModifier) {
          if (matched) {
            ev.preventDefault();
            ev.stopPropagation();
          } else {
            handleExitKeytipMode(ev);
          }
        }
      }
    },
    [
      handleKeytipExecution,
      handleShortcutExecution,
      handlePartiallyMatchedNodes,
      handleExitKeytipMode,
      handleReturnSequence,
      activationModifier,
      enabled,
      returnSequence,
      exitSequence,
      targetDocument,
    ]
  );

  React.useEffect(() => {
    if (!targetDocument) return;

    const view = targetDocument.defaultView;
    if (activationModifier) {
      view?.addEventListener(invokeEvent, handleInvokeEvent);
    } else {
      targetDocument.addEventListener(invokeEvent, handleInvokeEvent);
    }

    return () => {
      if (activationModifier) {
        view?.removeEventListener(invokeEvent, handleInvokeEvent);
      } else {
        targetDocument.removeEventListener(invokeEvent, handleInvokeEvent);
      }
      clearShortcutTimeout();
    };
  }, [activationModifier, handleInvokeEvent, invokeEvent, targetDocument]);

  const resetGesture = useEventCallback(() => {
    clearInputTimeout();
    gesture.current = {
      held: false,
      consumeKeyUp: false,
      consecutive: false,
      aliasAllowed: false,
      aliasKey: '',
    };
    pendingInput.current = undefined;
  });

  const deferUnhandledInput = useEventCallback((ev: KeyboardEvent) => {
    if (!inKeytipMode.current) return;
    pendingInput.current = ev;
    // Native dispatch can run microtasks between listeners; wait for a task
    // before deciding that an application shortcut stopped propagation.
    clearInputTimeout();
    setInputTimeout(() => {
      if (pendingInput.current === ev) {
        handleExitKeytipMode(ev);
      }
    }, 0);
  });

  const handleActivationKeyDown = useEventCallback((ev: KeyboardEvent) => {
    if (!enabled || !activationModifier) return;

    if (
      ev.isComposing ||
      ev.key === 'AltGraph' ||
      ev.code === 'AltRight' ||
      ev.getModifierState('AltGraph')
    ) {
      handleExitKeytipMode(ev);
      resetGesture();
      return;
    }

    const state = gesture.current;
    const isActivation = isKeyMatchingKeyboardEvent(
      parseHotkey(activationModifier),
      ev
    );
    const consume = () => {
      ev.preventDefault();
      ev.stopPropagation();
    };

    if (isActivation) {
      if (ev.repeat) {
        if (state.consumeKeyUp) consume();
        return;
      }

      state.held = true;
      if (ev.defaultPrevented) {
        handleExitKeytipMode(ev);
        return;
      }

      if (inKeytipMode.current) {
        const passThrough = state.consecutive;
        handleExitKeytipMode(ev);
        state.consumeKeyUp = !passThrough;
      } else {
        state.consumeKeyUp = handleEnterKeytipMode(ev);
        state.consecutive = state.consumeKeyUp;
        state.aliasAllowed = state.consumeKeyUp;
      }

      if (state.consumeKeyUp) consume();
      return;
    }

    const isModifier = isModifierKey(ev.key);
    if (!isModifier) state.consecutive = false;

    const isAlias = startSequences.some((sequence) =>
      isKeyMatchingKeyboardEvent(parseHotkey(sequence), ev)
    );
    if (
      !ev.defaultPrevented &&
      isAlias &&
      (!state.held || state.aliasAllowed)
    ) {
      if (!state.held) handleEnterKeytipMode(ev);
      state.aliasAllowed = false;
      state.aliasKey = ev.key;
      consume();
      return;
    }

    if (isModifier) return;
    state.aliasAllowed = false;

    // A missing modifier flag recovers from a keyup lost outside the page.
    if (!ev.getModifierState(activationModifierKey(activationModifier))) {
      state.held = false;
      state.consumeKeyUp = false;
    }

    if (state.held) {
      handleExitKeytipMode(ev);
      return;
    }

    deferUnhandledInput(ev);
  });

  const handleActivationKeyUp = useEventCallback((ev: KeyboardEvent) => {
    if (pendingInput.current?.type === 'keydown') {
      handleExitKeytipMode(pendingInput.current);
    }

    if (ev.key.toLowerCase() === activationModifier) {
      if (gesture.current.consumeKeyUp) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      gesture.current.held = false;
      gesture.current.consumeKeyUp = false;
      gesture.current.aliasAllowed = false;
    } else if (gesture.current.aliasKey === ev.key) {
      ev.preventDefault();
      ev.stopPropagation();
      gesture.current.aliasKey = '';
    } else if (invokeEvent === 'keyup' && !isModifierKey(ev.key)) {
      deferUnhandledInput(ev);
    }
  });

  const handleInputBubble = useEventCallback((ev: KeyboardEvent) => {
    if (pendingInput.current === ev) {
      pendingInput.current = undefined;
      if (ev.defaultPrevented) handleExitKeytipMode(ev);
    }
  });

  const handleBlur = useEventCallback((ev: Event) => {
    handleExitKeytipMode(ev);
    resetGesture();
  });

  React.useEffect(() => {
    if (!activationModifier || !targetDocument) return;
    const view = targetDocument.defaultView;
    targetDocument.addEventListener('keydown', handleActivationKeyDown, true);
    targetDocument.addEventListener('keyup', handleActivationKeyUp, true);
    view?.addEventListener('keydown', handleInputBubble);
    view?.addEventListener('blur', handleBlur);
    return () => {
      targetDocument.removeEventListener(
        'keydown',
        handleActivationKeyDown,
        true
      );
      targetDocument.removeEventListener('keyup', handleActivationKeyUp, true);
      view?.removeEventListener('keydown', handleInputBubble);
      view?.removeEventListener('blur', handleBlur);
      resetGesture();
    };
  }, [
    activationModifier,
    targetDocument,
    handleActivationKeyDown,
    handleActivationKeyUp,
    handleInputBubble,
    handleBlur,
    resetGesture,
  ]);

  React.useEffect(() => {
    if (!enabled) {
      handleExitKeytipMode(new KeyboardEvent(invokeEvent));
      resetGesture();
    }
  }, [enabled, handleExitKeytipMode, invokeEvent, resetGesture]);

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
    !enabled || activationModifier
      ? []
      : [
          ...startSequences.map(
            (sequence) =>
              [sequence, handleEnterKeytipMode, { delay: startDelay }] as Hotkey
          ),
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
    activationModifier,
    mountNode: props.mountNode,
    keytips: keytipsToRender,
    root: slot.always(getIntrinsicElementProps('div', { ...props }), {
      elementType: 'div',
    }),
  };
};

const isModifierKey = (key: string): boolean =>
  ['alt', 'control', 'ctrl', 'meta', 'os', 'shift', 'altgraph'].includes(
    key.toLowerCase()
  );

const activationModifierKey = (
  modifier: NonNullable<KeytipsProps['activationModifier']>
): string => modifier[0].toUpperCase() + modifier.slice(1);
