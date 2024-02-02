import { Slot } from '@fluentui/react-components';
import { EventData, EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';
import { ComponentProps } from '../../utils/types';

export type TreeGridRowOnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

export type TreeGridRowProps = ComponentProps<Slot<'div'>> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: EventHandler<TreeGridRowOnOpenChangeData>;
  subtree?: Slot<typeof React.Fragment> | true;
};
