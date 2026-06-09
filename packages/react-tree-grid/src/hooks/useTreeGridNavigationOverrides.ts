import * as React from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  End,
  Home,
} from '@fluentui/keyboard-keys';
import { isHTMLElement } from '@fluentui/react-utilities';
import type {
  TreeGridProps,
  TreeGridTabsterMoveFocusEventDetail,
} from '../components/TreeGrid';

export type TreeGridNavigationOverrideRequest = () => void;

export type TreeGridNavigationStageResult =
  | { type: 'pass'; preventDefault?: boolean }
  | { type: 'handled'; request?: TreeGridNavigationOverrideRequest };

type TreeGridNavigationResult =
  | { type: 'prevent-default' }
  | { type: 'handled'; request?: TreeGridNavigationOverrideRequest }
  | undefined;

export const treeGridNavigationPass: TreeGridNavigationStageResult = {
  type: 'pass',
};

export const treeGridNavigationPassAndPreventDefault: TreeGridNavigationStageResult =
  {
    type: 'pass',
    preventDefault: true,
  };

const treeGridNavigationPreventDefault: TreeGridNavigationResult = {
  type: 'prevent-default',
};

export const treeGridNavigationHandled: TreeGridNavigationStageResult = {
  type: 'handled',
};

export type TreeGridNavigationOverrideOptions = {
  onFocusFirst?: () => TreeGridNavigationStageResult;
  onFocusLast?: () => TreeGridNavigationStageResult;
  onFocusParent?: (row: HTMLElement) => TreeGridNavigationStageResult;
  onFocusPrevious?: (row: HTMLElement) => TreeGridNavigationStageResult;
  onFocusNext?: (row: HTMLElement) => TreeGridNavigationStageResult;
};

const mergeOverrideHandlers = <Args extends unknown[]>(
  ...handlers: Array<
    ((...args: Args) => TreeGridNavigationStageResult) | undefined
  >
) => {
  return (...args: Args): TreeGridNavigationResult => {
    let shouldPreventDefault = false;

    for (const handler of handlers) {
      const result = handler?.(...args) ?? treeGridNavigationPass;
      if (result.type === 'pass') {
        if (result.preventDefault) {
          shouldPreventDefault = true;
        }
        continue;
      }

      return result;
    }

    return shouldPreventDefault ? treeGridNavigationPreventDefault : undefined;
  };
};

export const useTreeGridNavigationOverrides = ({
  onFocusFirst,
  onFocusLast,
  onFocusParent,
  onFocusPrevious,
  onFocusNext,
}: TreeGridNavigationOverrideOptions): TreeGridNavigationOverrideOptions =>
  React.useMemo(
    () => ({
      onFocusFirst,
      onFocusLast,
      onFocusParent,
      onFocusPrevious,
      onFocusNext,
    }),
    [onFocusFirst, onFocusLast, onFocusNext, onFocusParent, onFocusPrevious]
  );

export const useMergeTreeGridNavigationOverrides = (
  ...navigationOverrides: TreeGridNavigationOverrideOptions[]
): Pick<TreeGridProps, 'onKeyDown' | 'onTabsterMoveFocus'> => {
  const onFocusFirst = React.useMemo(
    () =>
      mergeOverrideHandlers(
        ...navigationOverrides.map((overrides) => overrides.onFocusFirst)
      ),
    navigationOverrides
  );
  const onFocusLast = React.useMemo(
    () =>
      mergeOverrideHandlers(
        ...navigationOverrides.map((overrides) => overrides.onFocusLast)
      ),
    navigationOverrides
  );
  const onFocusParent = React.useMemo(
    () =>
      mergeOverrideHandlers(
        ...navigationOverrides.map((overrides) => overrides.onFocusParent)
      ),
    navigationOverrides
  );
  const onFocusPrevious = React.useMemo(
    () =>
      mergeOverrideHandlers(
        ...navigationOverrides.map((overrides) => overrides.onFocusPrevious)
      ),
    navigationOverrides
  );
  const onFocusNext = React.useMemo(
    () =>
      mergeOverrideHandlers(
        ...navigationOverrides.map((overrides) => overrides.onFocusNext)
      ),
    navigationOverrides
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key !== ArrowLeft || !isHTMLElement(event.target)) {
        return;
      }

      if (!onFocusParent) {
        return;
      }

      const row = event.target.closest<HTMLElement>('[role="row"]');
      const result = row ? onFocusParent(row) : undefined;
      if (!result) {
        return;
      }

      event.preventDefault();

      if (result.type !== 'handled' || !result.request) {
        return;
      }

      result.request();
    },
    [onFocusParent]
  );

  const handleTabsterMoveFocus = React.useCallback(
    (event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>): void => {
      const { relatedEvent } = event.detail;
      if (!('key' in relatedEvent)) {
        return;
      }

      const key = (relatedEvent as KeyboardEvent).key;
      const target = relatedEvent.target;
      const row =
        isHTMLElement(target) && target.closest<HTMLElement>('[role="row"]');

      const result =
        key === Home
          ? onFocusFirst?.()
          : key === End
          ? onFocusLast?.()
          : key === ArrowUp
          ? row
            ? onFocusPrevious?.(row)
            : undefined
          : key === ArrowDown
          ? row
            ? onFocusNext?.(row)
            : undefined
          : undefined;

      if (!result) {
        return;
      }

      event.preventDefault();
      relatedEvent.preventDefault();

      if (result.type !== 'handled' || !result.request) {
        return;
      }

      if (!isHTMLElement(target)) {
        return;
      }

      const request = result.request;
      if (!request) {
        return;
      }

      if (!target.ownerDocument.defaultView) {
        return;
      }

      target.ownerDocument.defaultView.setTimeout(() => {
        request();
      }, 0);
    },
    [onFocusFirst, onFocusLast, onFocusNext, onFocusPrevious]
  );

  return React.useMemo(
    () => ({
      onKeyDown: handleKeyDown,
      onTabsterMoveFocus: handleTabsterMoveFocus,
    }),
    [handleKeyDown, handleTabsterMoveFocus]
  );
};
