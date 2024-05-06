import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DialogExample } from '../../src/components/fluent/DialogExample';

export const Dialog = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <DialogExample />
  </FluentProvider>
);
