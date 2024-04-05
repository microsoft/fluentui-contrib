import * as React from 'react';
//import { brandRamp } from '@fluentui-contrib/azuretheme-v9';
import {
  azureLightTheme,
  azureDarkTheme,
  V9PrimaryButton,
} from '../../src/tokens/brandRamp';
import { FluentProvider, Button } from '@fluentui/react-components';

export const Default = () => (
  <div>
    <div>
      <FluentProvider theme={azureLightTheme}>
        <Button appearance="primary">Primary</Button>
      </FluentProvider>
    </div>
    <br></br>
    <div>
      <FluentProvider theme={azureLightTheme}>
        <V9PrimaryButton />
      </FluentProvider>
    </div>
    <br></br>
    <div>
      <FluentProvider theme={azureDarkTheme}>
        <V9PrimaryButton />
      </FluentProvider>
    </div>
  </div>
);
