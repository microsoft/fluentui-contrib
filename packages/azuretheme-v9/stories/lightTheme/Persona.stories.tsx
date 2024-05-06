import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { PersonaExample } from '../../src/components/fluent/PersonaExample';

export const Persona = () => (
  <FluentProvider theme={azureLightTheme}>
    <PersonaExample />
  </FluentProvider>
);
