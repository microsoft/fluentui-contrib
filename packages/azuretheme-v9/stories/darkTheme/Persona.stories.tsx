import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { PersonaExample } from '../../src/components/fluent/PersonaExample';

export const Persona = () => (
  <FluentProvider theme={azureDarkTheme}>
    <PersonaExample />
  </FluentProvider>
);
