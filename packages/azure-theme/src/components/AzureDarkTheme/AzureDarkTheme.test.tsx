import * as React from 'react';
import { render } from '@testing-library/react';
import { AzureDarkTheme } from './AzureDarkTheme';
import { FluentProvider } from '@fluentui/react-components';
describe('AzureDarkTheme', () => {
  it('should render', () => {
    render(
      <FluentProvider theme={AzureDarkTheme}>
        {/* other components go here */}
      </FluentProvider>
    );
  });
}); // Add a closing parenthesis here
