import * as React from 'react';
import { makeStyles, teamsLightV21Theme } from '@fluentui/react-components';
import {
  CAPThemeProvider,
  CAP_THEME_ONE_DRIVE,
  CAP_THEME_SHAREPOINT,
  CAP_THEME_TEAMS,
} from '@fluentui-contrib/react-cap-theme';

export interface CAPThemeExample {
  title: string;
  render(variant: 'v9' | 'cap'): React.ReactElement | 'NOT_IMPLEMENTED';
}

const CAP_THEMES = {
  current: {
    label: 'Current',
    variant: 'v9' as const,
    wrap: (children: React.ReactNode) => <>{children}</>,
  },
  teams: {
    label: 'Visual Refresh (Teams)',
    variant: 'cap' as const,
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...teamsLightV21Theme, ...CAP_THEME_TEAMS }}>
        {children}
      </CAPThemeProvider>
    ),
  },
  onedrive: {
    label: 'Visual Refresh (OneDrive)',
    variant: 'cap' as const,
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...CAP_THEME_ONE_DRIVE }}>
        {children}
      </CAPThemeProvider>
    ),
  },
  sharepoint: {
    label: 'Visual Refresh (SharePoint)',
    variant: 'cap' as const,
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...CAP_THEME_SHAREPOINT }}>
        {children}
      </CAPThemeProvider>
    ),
  },
} as const;

type CAPThemeKey = keyof typeof CAP_THEMES;
type CAPThemeSelection = (typeof CAP_THEMES)[CAPThemeKey];

const CAPThemeSelectionContext =
  React.createContext<CAPThemeSelection>(CAP_THEMES.current);

export const CAPThemeSelectionProvider = ({
  themeKey,
  children,
}: {
  themeKey: CAPThemeKey;
  children: React.ReactNode;
}) => {
  const selection = CAP_THEMES[themeKey] ?? CAP_THEMES.current;
  return (
    <CAPThemeSelectionContext.Provider value={selection}>
      {children}
    </CAPThemeSelectionContext.Provider>
  );
};

export const useCAPThemeSelection = () =>
  React.useContext(CAPThemeSelectionContext);

export const CAPThemeExamples = ({
  examples,
}: {
  examples: CAPThemeExample[];
}) => {
  const styles = useCAPThemeExamplesStyles();
  const selectedTheme = useCAPThemeSelection();

  return selectedTheme.wrap(
    <div className={styles.table}>
      <div className={styles.themeLabel}>Showing: {selectedTheme.label}</div>
      {examples.map((example) => (
        <div className={styles.row} key={example.title}>
          <div className={styles.example}>{example.title}</div>
          <div className={styles.rendered}>
            {renderExample(example, selectedTheme.variant)}
          </div>
        </div>
      ))}
    </div>
  );
};

function renderExample(example: CAPThemeExample, variant: 'v9' | 'cap') {
  const result = example.render(variant);
  if (result === 'NOT_IMPLEMENTED') {
    return <span style={{ color: 'red' }}>NOT IMPLEMENTED</span>;
  }
  return result;
}

const useCAPThemeExamplesStyles = makeStyles({
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  themeLabel: {
    fontWeight: 700,
    padding: '8px 0',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  example: {
    minWidth: '200px',
    fontWeight: 600,
  },
  rendered: {
    flex: 1,
    '& > div': {
      width: 'fit-content',
    },
  },
});
