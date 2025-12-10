import * as React from 'react';
import {
  FluentProvider,
  makeStyles,
  teamsLightV21Theme,
} from '@fluentui/react-components';
import {
  CAPThemeProvider,
  CAP_THEME_ONE_DRIVE,
  CAP_THEME_SHAREPOINT,
  CAP_THEME_TEAMS,
} from '@fluentui-contrib/react-cap-theme';

export interface CAPThemeExample {
  title?: string;
  render(variant: 'v9' | 'cap'): React.ReactElement | 'NOT_IMPLEMENTED';
  note?: string;
}

const CAP_THEMES = {
  current: {
    label: 'Current',
    variant: 'v9' as const,
    theme: null,
    wrap: (children: React.ReactNode) => <>{children}</>,
  },
  teams: {
    label: 'Visual Refresh (Teams)',
    variant: 'cap' as const,
    theme: { ...teamsLightV21Theme, ...CAP_THEME_TEAMS },
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...teamsLightV21Theme, ...CAP_THEME_TEAMS }}>
        {children}
      </CAPThemeProvider>
    ),
  },
  onedrive: {
    label: 'Visual Refresh (OneDrive)',
    variant: 'cap' as const,
    theme: CAP_THEME_ONE_DRIVE,
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...CAP_THEME_ONE_DRIVE }}>
        {children}
      </CAPThemeProvider>
    ),
  },
  sharepoint: {
    label: 'Visual Refresh (SharePoint)',
    variant: 'cap' as const,
    theme: CAP_THEME_SHAREPOINT,
    wrap: (children: React.ReactNode) => (
      <CAPThemeProvider theme={{ ...CAP_THEME_SHAREPOINT }}>
        {children}
      </CAPThemeProvider>
    ),
  },
} as const;

type CAPThemeKey = keyof typeof CAP_THEMES;
type CAPThemeSelection = (typeof CAP_THEMES)[CAPThemeKey];

const CAPThemeSelectionContext = React.createContext<CAPThemeSelection>(
  CAP_THEMES.current
);

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

// Single column view that shows only the selected theme
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
          {example.title && (
            <div className={styles.example}>{example.title}</div>
          )}
          <div className={styles.rendered}>
            {renderExample(example, selectedTheme.variant)}
          </div>
          {example.note && <div className={styles.note}>{example.note}</div>}
        </div>
      ))}
    </div>
  );
};

// Table view that shows Current + all three CAP themes side by side
export const CAPThemeExamplesTable = ({
  examples,
}: {
  examples: CAPThemeExample[];
}) => {
  const styles = useCAPThemeExamplesTableStyles();
  const selectedTheme = useCAPThemeSelection();

  // Map the selected theme label to our theme config
  const getSelectedThemeConfig = () => {
    if (selectedTheme.label === 'Visual Refresh (Teams)')
      return CAP_THEMES.teams;
    if (selectedTheme.label === 'Visual Refresh (OneDrive)')
      return CAP_THEMES.onedrive;
    if (selectedTheme.label === 'Visual Refresh (SharePoint)')
      return CAP_THEMES.sharepoint;
    return CAP_THEMES.current;
  };

  const selectedConfig = getSelectedThemeConfig();
  const themesToShow = [
    selectedConfig,
    CAP_THEMES.teams,

    // We intentionally don't show these other themes in the side-by-side comparison tables.
    // They currently look exactly the same as the Teams theme, so they eat up horizontal
    // space without adding any value.
    // CAP_THEMES.onedrive,
    // CAP_THEMES.sharepoint,
  ];

  return (
    <FluentProvider>
      <div className={styles.table}>
        <div className={styles.row}>
          <div style={{ fontWeight: 800 }}>Example</div>
          {themesToShow.map((config, idx) => (
            <div key={`${config.label}-${idx}`} style={{ fontWeight: 800 }}>
              {idx === 0 ? 'Current' : config.label}
            </div>
          ))}
          <div style={{ fontWeight: 800 }}>Note</div>
        </div>
        {examples.map((example, index) => {
          return (
            <div className={styles.row} key={index}>
              <div>{example.title}</div>
              {themesToShow.map((config, idx) => (
                <div key={`${config.label}-${idx}`}>
                  {config.theme ? (
                    <CAPThemeProvider theme={config.theme}>
                      {renderExample(example, config.variant)}
                    </CAPThemeProvider>
                  ) : (
                    renderExample(example, config.variant)
                  )}
                </div>
              ))}
              <div className={styles.noteColumn}>
                {example.note && (
                  <span style={{ fontStyle: 'italic', color: '#666' }}>
                    {example.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </FluentProvider>
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
  note: {
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

const useCAPThemeExamplesTableStyles = makeStyles({
  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    '& > div': {
      flex: 2,
      padding: '16px',
      border: '1px solid #ddd',
    },
    '& > div:first-child': {
      flex: 1,
    },
    '& > div:last-child': {
      flex: 1,
    },
  },
  noteColumn: {
    flex: 1,
    padding: '16px',
    border: '1px solid #ddd',
  },
});
