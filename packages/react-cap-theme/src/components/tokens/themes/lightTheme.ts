import { brandCAP } from '../global/brandColors';
import type { Theme } from '../types';
import { createLightTheme } from '../utils/createLightTheme';

export const lightTheme: Theme = { ...createLightTheme(brandCAP) };
