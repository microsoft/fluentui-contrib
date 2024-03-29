import * as React from 'react';
//import { brandRamp } from '@fluentui-contrib/azuretheme-v9';
import {
  Button,
  FluentProvider,
  teamsLightTheme,
} from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';

export const Default = (props: ButtonProps) => (
  <FluentProvider theme={teamsLightTheme}>
    <Button appearance="primary" {...props}>
      Example Button
    </Button>
  </FluentProvider>
);
