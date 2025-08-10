import * as React from 'react';
import { Tooltip, TooltipProps } from '@fluentui/react-components';
import { StrictSlot } from '../../strictSlot';

export const renderTooltip = (
  children: TooltipProps['children'],
  title: NonNullable<StrictSlot>
) => {
  return (
    <Tooltip content={title} relationship="label">
      {children}
    </Tooltip>
  );
};
