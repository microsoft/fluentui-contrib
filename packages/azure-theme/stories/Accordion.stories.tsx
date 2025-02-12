import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  FluentProvider,
  Label,
} from '@fluentui/react-components';

export const AccordionExample = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader>Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Accordion Header 2</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 2</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader>Accordion Header 3</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 3</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader>Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Accordion Header 2</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 2</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader>Accordion Header 3</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 3</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FluentProvider>
  </div>
);
