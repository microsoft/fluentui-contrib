import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { MessageBarExample } from '../../src/components/fluent/MessageBarExample';

export const MessageBar = () => (
  <FluentProvider theme={azureDarkTheme}>
    <MessageBarExample />
  </FluentProvider>
);
