import type { Slot } from '@fluentui/react-components';
import { ComponentProps } from '../../utils/types';

export type TreeGridCellProps = Omit<ComponentProps<Slot<'div'>>, 'header'> & {
  header?: boolean;
};
