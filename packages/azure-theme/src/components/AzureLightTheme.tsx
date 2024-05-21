import { Theme, createLightTheme } from '@fluentui/react-components';
import { brandAzure } from '../tokens/brandRamp';
import { neutralColorsLight } from '../tokens/brandRamp';

const lightColors: Theme = createLightTheme(brandAzure);

export const azureLightTheme: Theme = {
  ...lightColors,
  ...neutralColorsLight,
};
