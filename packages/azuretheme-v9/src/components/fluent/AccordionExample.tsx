import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-components';

export const AccordionExample = () => (
  <>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="small">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="medium">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="large">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="extra-large">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </>
);
