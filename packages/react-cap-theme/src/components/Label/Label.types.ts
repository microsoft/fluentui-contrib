import * as React from 'react';
import type {
  LabelProps as FluentLabelProps,
  LabelState as FluentLabelState,
} from '@fluentui/react-components';

export type LabelProps = FluentLabelProps & {
  /**
   * Optional leading badge rendered before the label text.
   */
  badge?: React.ReactNode;
  /**
   * Controls whether the badge is shown when `badge` is not provided.
   * @default false
   */
  showBadge?: boolean;
};

export type LabelState = FluentLabelState;
