import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TextareaExample } from '../../src/components/fluent/Textarea';

export const Textarea = () => (
  <FluentProvider theme={azureLightTheme}>
    <TextareaExample />
  </FluentProvider>
);
