import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { MessageBarExample } from '../../src/components/fluent/MessageBarExample';

export const MessageBar = () => (
  <FluentProvider theme={azureLightTheme}>
    <MessageBarExample />
  </FluentProvider>
);
