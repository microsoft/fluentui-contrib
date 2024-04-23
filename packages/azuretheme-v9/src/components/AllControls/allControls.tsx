import * as React from 'react';
import { ButtonsExample } from '../fluent/ButtonsExample/ButtonsExample';
import { AccordionExample } from '../fluent/AccordionExample/AccordionExample';
import { AvatarExample } from '../fluent/AvatarExample/AvatarExample';
import { AvatarGroupExample } from '../fluent/AvatarGroupExample/AvatarGroupExample';
import { BadgeExample } from '../fluent/BadgeExample/BadgeExample';

export const AllControls = () => {
  return (
    <div>
      <div>All controls</div>
      <ButtonsExample />
      <AccordionExample />
      <AvatarExample />
      <AvatarGroupExample />
      <BadgeExample />
    </div>
  );
};
