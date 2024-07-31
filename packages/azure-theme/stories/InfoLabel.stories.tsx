import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  InfoLabel,
  InfoLabelProps,
  Link,
  FluentProvider,
} from '@fluentui/react-components';

export const InfoLabelExample = (props: Partial<InfoLabelProps>) => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <InfoLabel
        info={
          <>
            This is example information for an InfoLabel.{' '}
            <Link href="https://react.fluentui.dev">Learn more</Link>
          </>
        }
        {...props}
      >
        Example label
      </InfoLabel>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <InfoLabel
        info={
          <>
            This is example information for an InfoLabel.{' '}
            <Link href="https://react.fluentui.dev">Learn more</Link>
          </>
        }
        {...props}
      >
        Example label
      </InfoLabel>
    </FluentProvider>
  </div>
);
