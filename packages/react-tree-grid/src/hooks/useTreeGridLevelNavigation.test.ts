import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { ArrowDown, ArrowUp } from '@fluentui/keyboard-keys';
import type { TreeGridTabsterMoveFocusEventDetail } from '../components/TreeGrid';
import { useTreeGridLevelNavigation } from './useTreeGridLevelNavigation';

const createRow = (level: number): HTMLDivElement => {
  const row = document.createElement('div');
  row.setAttribute('role', 'row');
  row.setAttribute('aria-level', String(level));
  row.tabIndex = 0;
  row.scrollIntoView = jest.fn();
  document.body.appendChild(row);
  return row;
};

const createWrappedRow = (
  level: number,
  treeGrid: HTMLElement
): HTMLDivElement => {
  const wrapper = document.createElement('div');
  const row = document.createElement('div');

  row.setAttribute('role', 'row');
  row.setAttribute('aria-level', String(level));
  row.tabIndex = 0;
  row.scrollIntoView = jest.fn();

  wrapper.appendChild(row);
  treeGrid.appendChild(wrapper);

  return row;
};

const createTreeGrid = (): HTMLDivElement => {
  const treeGrid = document.createElement('div');
  treeGrid.setAttribute('role', 'treegrid');
  document.body.appendChild(treeGrid);
  return treeGrid;
};

const createKeyboardEvent = (
  key: string,
  target: HTMLElement
): KeyboardEvent => {
  const event = new KeyboardEvent('keydown', { bubbles: true, key });

  Object.defineProperty(event, 'target', {
    configurable: true,
    value: target,
  });

  return event;
};

const createReactKeyboardEvent = (
  nativeEvent: KeyboardEvent
): React.KeyboardEvent<HTMLElement> => {
  const preventDefault = jest.fn();

  return {
    key: nativeEvent.key,
    nativeEvent,
    preventDefault,
    isDefaultPrevented: () => preventDefault.mock.calls.length > 0,
    target: nativeEvent.target,
  } as unknown as React.KeyboardEvent<HTMLElement>;
};

const createMoveFocusEvent = (
  relatedEvent: KeyboardEvent,
  owner: HTMLElement
): CustomEvent<TreeGridTabsterMoveFocusEventDetail> => {
  return new CustomEvent<TreeGridTabsterMoveFocusEventDetail>(
    'tabstermovefocus',
    {
      cancelable: true,
      detail: { owner, relatedEvent },
    }
  );
};

describe('useTreeGridLevelNavigation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('focuses the next row at the same level', () => {
    const { result } = renderHook(() => useTreeGridLevelNavigation());
    const treeGrid = createTreeGrid();
    const currentRow = createWrappedRow(2, treeGrid);
    createWrappedRow(3, treeGrid);
    const nextRow = createWrappedRow(2, treeGrid);
    const nativeEvent = createKeyboardEvent(ArrowDown, currentRow);
    const keyboardEvent = createReactKeyboardEvent(nativeEvent);

    result.current.onKeyDown(keyboardEvent);

    expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(nextRow.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
    expect(nextRow).toBe(document.activeElement);
  });

  it('allows shallower-boundary navigation to fall through', () => {
    const { result } = renderHook(() => useTreeGridLevelNavigation());
    const treeGrid = createTreeGrid();
    const parentRow = createWrappedRow(1, treeGrid);
    const currentRow = createWrappedRow(2, treeGrid);
    const nativeEvent = createKeyboardEvent(ArrowUp, currentRow);
    const keyboardEvent = createReactKeyboardEvent(nativeEvent);
    const moveFocusEvent = createMoveFocusEvent(nativeEvent, parentRow);

    result.current.onTabsterMoveFocus(moveFocusEvent);
    result.current.onKeyDown(keyboardEvent);

    expect(moveFocusEvent.defaultPrevented).toBe(false);
    expect(keyboardEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('skips wrapper elements when finding adjacent rows', () => {
    const { result } = renderHook(() => useTreeGridLevelNavigation());
    const treeGrid = createTreeGrid();
    const currentRow = createWrappedRow(1, treeGrid);
    const nextRow = createWrappedRow(1, treeGrid);
    const nativeEvent = createKeyboardEvent(ArrowDown, currentRow);
    const keyboardEvent = createReactKeyboardEvent(nativeEvent);

    result.current.onKeyDown(keyboardEvent);

    expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(nextRow.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
    expect(nextRow).toBe(document.activeElement);
  });
});
