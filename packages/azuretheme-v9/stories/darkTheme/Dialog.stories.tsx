import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DialogExample } from '../../src/components/fluent/DialogExample';

export const Dialog = () => (
  <FluentProvider theme={azureDarkTheme}>
    <DialogExample />
  </FluentProvider>
);
