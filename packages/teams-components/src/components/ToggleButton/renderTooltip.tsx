import * as React from 'react';
import { Tooltip } from '@fluentui/react-components';
import { StrictSlot } from '../../strictSlot';

export const renderTooltip = (children: StrictSlot, title: StrictSlot) => {
  return (
    <Tooltip content={title} relationship="label">
      {children}
    </Tooltip>
  );
};
