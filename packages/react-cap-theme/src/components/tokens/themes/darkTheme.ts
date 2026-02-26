import { brandCAP } from "../global/brandColors";
import type { Theme } from "../types";
import { createDarkTheme } from "../utils/createDarkTheme";

/**
 * @public
 * CAP Design System predefined dark theme
 * @deprecated The dark theme is deprecated and will be removed in a future version. Use lightTheme instead.
 */
export const darkTheme: Theme = { ...createDarkTheme(brandCAP) };
