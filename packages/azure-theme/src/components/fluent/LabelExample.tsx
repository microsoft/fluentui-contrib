import * as React from 'react';
import { Label } from '@fluentui/react-components';
import type { LabelProps } from '@fluentui/react-components';

export const LabelExample = (props: LabelProps) => (
  <>
    <Label {...props}>This is a label</Label>
    <Label size="small">Small</Label>
    <Label size="medium">Medium</Label>
    <Label size="large">Large</Label>
  </>
);
