'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Button as FluentButton } from '@fluentui/react-components';
import type { ButtonProps } from './Button.types';

export const Button = FluentButton as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
