import * as React from 'react';
import type {
  TreeGridRowOnOpenChangeData,
  TreeGridRowProps,
} from '../components/TreeGridRow';
import {
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';

/**
 * Context value shared by a TreeGridRow and its descendants.
 */
export type TreeGridRowContextValue = {
  /**
   * Level inherited by descendant rows.
   */
  level: number;
  /**
   * Current open state for the nearest row that owns a subtree.
   */
  open: boolean;
  /**
   * Requests an open-state change for the nearest owning row.
   */
  requestOpenChange(data: TreeGridRowOnOpenChangeData): void;
};

const defaultTreeGridRowContextValue: TreeGridRowContextValue = {
  level: 1,
  open: true,
  requestOpenChange: () => {
    /* noop */
  },
};

const TreeGridRowContext = React.createContext<
  TreeGridRowContextValue | undefined
>(undefined);

/**
 * Provides TreeGridRow context to descendant rows and triggers.
 */
export const { Provider: TreeGridRowProvider } = TreeGridRowContext;

/**
 * Returns the nearest TreeGridRow context, or the default top-level context.
 */
export const useTreeGridRowContext = (): TreeGridRowContextValue =>
  React.useContext(TreeGridRowContext) ?? defaultTreeGridRowContextValue;

export const normalizeTreeGridRowLevel = (level: number): number =>
  Math.max(1, level);

export const useTreeGridRowContextValue = (
  props: Pick<
    TreeGridRowProps,
    'level' | 'open' | 'defaultOpen' | 'onOpenChange'
  >
): TreeGridRowContextValue => {
  const { level: parentLevel } = useTreeGridRowContext();
  const currentLevel = normalizeTreeGridRowLevel(props.level ?? parentLevel);
  const [open, setOpen] = useControllableState({
    state: props.open,
    initialState: false,
    defaultState: props.defaultOpen,
  });
  const requestOpenChange = useEventCallback(
    (data: TreeGridRowOnOpenChangeData) => {
      props.onOpenChange?.(data.event, data);
      setOpen(data.open);
    }
  );
  const context: TreeGridRowContextValue = React.useMemo(
    () => ({
      level: currentLevel + 1,
      open,
      requestOpenChange,
    }),
    [currentLevel, open, requestOpenChange]
  );
  return context;
};
