import * as React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  getTheme,
  setTheme as setThemeCore,
  subscribe,
  type CapFoundationsThemeState,
} from '@fluentui-contrib/cap-foundations-core';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextValue {
  theme: string;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  setTheme: (theme: string, mode?: ThemeMode) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  const [state, setState] = useState<CapFoundationsThemeState>(() => getTheme());

  useEffect(() => {
    // Bootstrap auto-initializes, just get current state
    setState(getTheme());

    // Subscribe to changes
    const unsubscribe = subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  const handleSetTheme = useCallback((theme: string, mode?: ThemeMode) => {
    setThemeCore(theme, mode);
  }, []);

  const handleSetMode = useCallback(
    (mode: ThemeMode) => {
      setThemeCore(state.theme, mode);
    },
    [state.theme],
  );

  const handleToggleMode = useCallback(() => {
    const nextMode: ThemeMode =
      state.mode === 'light' ? 'dark' : state.mode === 'dark' ? 'auto' : 'light';
    setThemeCore(state.theme, nextMode);
  }, [state.theme, state.mode]);

  const value: ThemeContextValue = {
    theme: state.theme,
    mode: state.mode,
    resolvedMode: state.resolvedMode,
    setTheme: handleSetTheme,
    setMode: handleSetMode,
    toggleMode: handleToggleMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = 'ThemeProvider';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
