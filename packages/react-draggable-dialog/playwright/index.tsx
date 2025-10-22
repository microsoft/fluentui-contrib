// Import styles, initialize component theme here.
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

beforeMount(async ({ App }) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
});
