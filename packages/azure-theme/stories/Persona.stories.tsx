import * as React from 'react';
import { Persona, FluentProvider } from '@fluentui/react-components';
import type { PersonaProps } from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';

export const PersonaExample = (props: Partial<PersonaProps>) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <Persona
          name="Kevin Sturgis"
          secondaryText="Available"
          presence={{ status: 'available' }}
          avatar={{
            image: {
              src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
            },
          }}
          {...props}
        />
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <Persona
          name="Kevin Sturgis"
          secondaryText="Available"
          presence={{ status: 'available' }}
          avatar={{
            image: {
              src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
            },
          }}
          {...props}
        />
      </FluentProvider>
    </div>
  );
};
