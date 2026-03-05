import { brandCAP } from "../global/brandColors";
import type { Theme } from "../types";
import { createLightTheme } from "../utils/createLightTheme";

/**
 * @public
 * CAP Design System predefined light theme
 */
export const lightTheme: Theme = { ...createLightTheme(brandCAP) };
