import * as React from 'react';
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui-contrib/react-popover';
import { Button } from '@fluentui/react-components';

export const Default = () => (
  <Popover>
    <PopoverTrigger>
      <button>Open Popover</button>
    </PopoverTrigger>
    <PopoverSurface>
      Popover Content
      <Button>Click me</Button>
    </PopoverSurface>
  </Popover>
);
