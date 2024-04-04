import * as React from 'react';
//import { brandRamp } from '@fluentui-contrib/azuretheme-v9';
import {
  azureLightTheme,
  azureDarkTheme,
  V9PrimaryButton,
} from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';

export const Default = () => (
  <div>
    <div>
      <FluentProvider theme={azureLightTheme}>
        <V9PrimaryButton />
      </FluentProvider>
    </div>

    <div>
      <FluentProvider theme={azureDarkTheme}>
        <V9PrimaryButton />
      </FluentProvider>
    </div>
  </div>
);
