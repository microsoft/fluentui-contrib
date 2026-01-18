import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = TriggerProps<PopoverTriggerChildProps>;

/**
 * PopoverTrigger State
 */
export type PopoverTriggerState = {
  children: React.ReactElement | null;
};

/**
 * Props that are passed to the child of the PopoverTrigger when cloned to ensure correct behaviour for the Popover
 */
export type PopoverTriggerChildProps = {
  popovertarget: string;
  ref: React.Ref<unknown>;
};
