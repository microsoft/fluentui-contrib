import * as React from 'react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';

export const Default = () => {
  return (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <h3>Popover title</h3>
          <p>This is a popover with the CAP theme applied.</p>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
