import { ComponentProps, Slot } from '@fluentui/react-components';
import { EventData, EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

export type TreeGridRowSlots = {
  root: Slot<'div'>;
};

export type TreeGridRowOnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

export type TreeGridRowProps = ComponentProps<TreeGridRowSlots> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: EventHandler<TreeGridRowOnOpenChangeData>;
  subtree?: Slot<typeof React.Fragment> | true;
};
