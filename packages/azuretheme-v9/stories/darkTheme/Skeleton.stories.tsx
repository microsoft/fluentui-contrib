import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SkeletonExample } from '../../src/components/fluent/SkeletonExample';

export const Skeleton = () => (
  <FluentProvider theme={azureDarkTheme}>
    <SkeletonExample />
  </FluentProvider>
);
