import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SkeletonExample } from '../../src/components/fluent/SkeletonExample';

export const Skeleton = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <SkeletonExample />
  </FluentProvider>
);
