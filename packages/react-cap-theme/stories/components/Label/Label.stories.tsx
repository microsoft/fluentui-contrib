import * as React from 'react';
import { Label, type LabelProps } from '@fluentui/react-components';
import { CAPThemeExamplesTable } from '../../StorybookUtils';

export const CAPLabelStory = (props: LabelProps) => {
  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Default',
          render() {
            return <Label {...props}>Label</Label>;
          },
        },
        {
          title: 'Required',
          render() {
            return (
              <Label required {...props}>
                Required Label
              </Label>
            );
          },
        },
        {
          title: 'Disabled',
          render() {
            return (
              <Label disabled {...props}>
                Disabled Label
              </Label>
            );
          },
        },
      ]}
    />
  );
};

CAPLabelStory.argTypes = {
  size: {
    options: ['small', 'medium', 'large'],
    control: { type: 'radio' },
  },
  weight: {
    options: ['regular', 'semibold'],
    control: { type: 'radio' },
  },
};

CAPLabelStory.args = {
  size: 'medium',
  weight: 'regular',
};
