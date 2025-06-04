import * as React from 'react';
import { Tooltip } from '@fluentui/react-components';

export const renderTooltip = (children: any, title: any) => {
  return (
    <Tooltip content={title} relationship="label">
      {children}
    </Tooltip>
  );
};
