import * as React from 'react';
import { EventData, EventHandler } from '@fluentui/react-utilities';

export type TreeGridRowGroupContextValue = {
  level: number;
  open: boolean;
  requestOpenChange(data: OnOpenChangeData): void;
};

export type OnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

export type TreeGridRowGroupProps = {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: EventHandler<OnOpenChangeData>;
};
