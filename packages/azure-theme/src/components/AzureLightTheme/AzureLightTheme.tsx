import { Theme, createLightTheme } from '@fluentui/react-components';
import { brandAzure } from '../../tokens/brandRamp';

const lightColors: Theme = createLightTheme(brandAzure);

export const AzureLightTheme: Theme = {
  ...lightColors,
};
