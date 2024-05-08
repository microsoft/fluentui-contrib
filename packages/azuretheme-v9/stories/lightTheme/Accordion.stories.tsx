import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AccordionExample } from '../../src/components/fluent/AccordionExample';

export const Accordion = () => (
  <FluentProvider theme={azureLightTheme}>
    <AccordionExample />
  </FluentProvider>
);
