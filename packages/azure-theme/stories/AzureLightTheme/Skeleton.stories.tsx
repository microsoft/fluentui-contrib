import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SkeletonExample } from '../../src/components/fluent/SkeletonExample';

export const Skeleton = () => (
  <FluentProvider theme={AzureLightTheme}>
    <SkeletonExample />
  </FluentProvider>
);
