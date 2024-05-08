import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { MessageBarExample } from '../../src/components/fluent/MessageBarExample';

export const MessageBar = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <MessageBarExample />
  </FluentProvider>
);
