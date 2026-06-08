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

export type TreeGridNavigationOverrideResult =
  | boolean
  | TreeGridNavigationOverrideRequest;

export type TreeGridNavigationOverrideOptions = {
  onFocusFirst?: () => TreeGridNavigationOverrideResult;
  onFocusLast?: () => TreeGridNavigationOverrideResult;
  onFocusParent?: (row: HTMLElement) => boolean;
  onFocusPrevious?: (row: HTMLElement) => TreeGridNavigationOverrideResult;
  onFocusNext?: (row: HTMLElement) => TreeGridNavigationOverrideResult;
};

const isDeferredFocusRequest = (
  value: TreeGridNavigationOverrideResult
): value is TreeGridNavigationOverrideRequest => typeof value === 'function';

export const useTreeGridNavigationOverrides = ({
  onFocusFirst,
  onFocusLast,
  onFocusParent,
  onFocusPrevious,
  onFocusNext,
}: TreeGridNavigationOverrideOptions): Pick<
  TreeGridProps,
  'onKeyDown' | 'onTabsterMoveFocus'
> => {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key !== ArrowLeft || !isHTMLElement(event.target)) {
        return;
      }

      if (!onFocusParent) {
        return;
      }

      const row = event.target.closest<HTMLElement>('[role="row"]');
      if (!row || !onFocusParent(row)) {
        return;
      }

      event.preventDefault();
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
          ? onFocusFirst?.() ?? false
          : key === End
          ? onFocusLast?.() ?? false
          : key === ArrowUp
          ? row
            ? onFocusPrevious?.(row) ?? false
            : false
          : key === ArrowDown
          ? row
            ? onFocusNext?.(row) ?? false
            : false
          : false;

      if (!result) {
        return;
      }

      event.preventDefault();
      relatedEvent.preventDefault();

      if (result === true) {
        return;
      }

      if (!isDeferredFocusRequest(result) || !isHTMLElement(target)) {
        return;
      }

      if (!target.ownerDocument.defaultView) {
        return;
      }

      target.ownerDocument.defaultView.setTimeout(() => {
        result();
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
