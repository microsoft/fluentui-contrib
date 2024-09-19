import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

export const TextareaExample = (props: Partial<TextareaProps>) => (
  <Field label="Default Textarea">
    <Textarea {...props} />
  </Field>
);
