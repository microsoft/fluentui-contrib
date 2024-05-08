import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DialogExample } from '../../src/components/fluent/DialogExample';

export const Dialog = () => (
  <FluentProvider theme={azureLightTheme}>
    <DialogExample />
  </FluentProvider>
);
