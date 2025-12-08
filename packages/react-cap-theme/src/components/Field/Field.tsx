import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Field as FluentField } from '@fluentui/react-components';
import type { FieldProps } from './Field.types';

export const Field = FluentField as ForwardRefComponent<FieldProps>;

Field.displayName = 'Field';
