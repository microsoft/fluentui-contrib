import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SkeletonExample } from '../../src/components/fluent/SkeletonExample';

export const Skeleton = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <SkeletonExample />
  </FluentProvider>
);
