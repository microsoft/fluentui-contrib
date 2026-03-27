import { brandCAP } from '../global/brandColors';
import type { Theme } from '../types';
import { createDarkTheme } from '../utils/createDarkTheme';

export const darkTheme: Theme = { ...createDarkTheme(brandCAP) };
