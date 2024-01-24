import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import {
  OnOpenChangeData,
  TreeGridRowGroupContextValue,
  TreeGridRowGroupProps,
} from './TreGridRow.types';

export const TreeGridRowGroup = (props: TreeGridRowGroupProps) => {
  const { level, open: parentOpen } = useTreeGridRowGroupContext();
  const [open, setOpen] = useControllableState({
    state: props.open,
    initialState: false,
    defaultState: props.defaultOpen,
  });

  const requestOpenChange = useEventCallback((data: OnOpenChangeData) => {
    props.onOpenChange?.(data.event, data);
    setOpen(data.open);
  });

  const context: TreeGridRowGroupContextValue = React.useMemo(
    () => ({
      level: level + 1,
      open,
      requestOpenChange,
    }),
    [level, open, requestOpenChange]
  );
  if (!parentOpen) return null;
  return (
    <TreeGridRowGroupProvider value={context}>
      {props.children}
    </TreeGridRowGroupProvider>
  );
};

const defaultTreeGridRowGroupContextValue: TreeGridRowGroupContextValue = {
  level: 0,
  open: true,
  requestOpenChange: () => {
    /* noop */
  },
};

const TreeGridRowGroupContext = React.createContext<
  TreeGridRowGroupContextValue | undefined
>(undefined);

const { Provider: TreeGridRowGroupProvider } = TreeGridRowGroupContext;

export const useTreeGridRowGroupContext = () =>
  React.useContext(TreeGridRowGroupContext) ??
  defaultTreeGridRowGroupContextValue;
