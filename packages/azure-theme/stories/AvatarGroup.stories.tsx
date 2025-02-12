import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
  FluentProvider,
} from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import type { AvatarGroupProps } from '@fluentui/react-components';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const AvatarGroupExample = (props: Partial<AvatarGroupProps>) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <AvatarGroup {...props}>
          {inlineItems.map((name) => (
            <AvatarGroupItem name={name} key={name} />
          ))}
          {overflowItems && (
            <AvatarGroupPopover>
              {overflowItems.map((name) => (
                <AvatarGroupItem name={name} key={name} />
              ))}
            </AvatarGroupPopover>
          )}
        </AvatarGroup>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <AvatarGroup {...props}>
          {inlineItems.map((name) => (
            <AvatarGroupItem name={name} key={name} />
          ))}
          {overflowItems && (
            <AvatarGroupPopover>
              {overflowItems.map((name) => (
                <AvatarGroupItem name={name} key={name} />
              ))}
            </AvatarGroupPopover>
          )}
        </AvatarGroup>
      </FluentProvider>
    </div>
  );
};
