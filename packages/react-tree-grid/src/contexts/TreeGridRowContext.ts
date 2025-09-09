import * as React from 'react';
import type {
  TreeGridRowOnOpenChangeData,
  TreeGridRowProps,
} from '../components/TreeGridRow';
import {
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';

export type TreeGridRowContextValue = {
  level: number;
  open: boolean;
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

export const { Provider: TreeGridRowProvider } = TreeGridRowContext;

export const useTreeGridRowContext = (): TreeGridRowContextValue =>
  React.useContext(TreeGridRowContext) ?? defaultTreeGridRowContextValue;

export const useTreeGridRowContextValue = (
  props: Pick<TreeGridRowProps, 'open' | 'defaultOpen' | 'onOpenChange'>
): TreeGridRowContextValue => {
  const { level: parentLevel } = useTreeGridRowContext();
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
      level: parentLevel + 1,
      open,
      requestOpenChange,
    }),
    [parentLevel, open, requestOpenChange]
  );
  return context;
};
