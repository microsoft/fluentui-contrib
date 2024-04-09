// import * as React from 'react';
// import { lightTheme } from '@fluentui-contrib/azuretheme-v9';

// export const Default = () => <lightTheme />;

import * as React from 'react';
//import { brandRamp } from '@fluentui-contrib/azuretheme-v9';
import { azureDarkTheme, V9PrimaryButton } from '../../src/tokens/brandRamp';
import { FluentProvider, Button } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={azureDarkTheme}>
    <div>Dark theme </div>
    <V9PrimaryButton />
  </FluentProvider>
);
