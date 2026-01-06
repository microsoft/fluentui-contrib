import { brandProjectTurtle } from '../global/brandColors';
import type { Theme } from '../types';
import { createLightTheme } from '../utils/createLightTheme';

/**
 * @public
 * ProjectTurtle Design System predefined light theme
 */
export const lightTheme: Theme = { ...createLightTheme(brandProjectTurtle) };
