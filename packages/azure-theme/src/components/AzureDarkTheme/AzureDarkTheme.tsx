import { Theme, createDarkTheme } from '@fluentui/react-components';
import { brandAzure } from '../../tokens/brandRamp';
import { neutralColorsDark } from '../../tokens/brandRamp';

const darkColors: Theme = createDarkTheme(brandAzure);

export const AzureDarkTheme: Theme = {
  ...darkColors,
  ...neutralColorsDark,
};
