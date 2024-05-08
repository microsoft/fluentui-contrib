import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SkeletonExample } from '../../src/components/fluent/SkeletonExample';

export const Skeleton = () => (
  <FluentProvider theme={azureLightTheme}>
    <SkeletonExample />
  </FluentProvider>
);
