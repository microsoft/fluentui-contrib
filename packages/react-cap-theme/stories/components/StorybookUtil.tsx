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
import { useCAPThemeSelection } from '../utils.stories';

export interface CAPThemeExample {
  title: string;
  render(variant: 'v9' | 'cap'): React.ReactElement | 'NOT_IMPLEMENTED';
}

const THEME_CONFIGS = {
  current: {
    label: 'Current',
    variant: 'v9' as const,
    theme: null,
  },
  teams: {
    label: 'Visual Refresh (Teams)',
    variant: 'cap' as const,
    theme: { ...teamsLightV21Theme, ...CAP_THEME_TEAMS },
  },
  onedrive: {
    label: 'Visual Refresh (OneDrive)',
    variant: 'cap' as const,
    theme: CAP_THEME_ONE_DRIVE,
  },
  sharepoint: {
    label: 'Visual Refresh (SharePoint)',
    variant: 'cap' as const,
    theme: CAP_THEME_SHAREPOINT,
  },
};

export const CAPThemeExamples = ({
  examples,
}: {
  examples: CAPThemeExample[];
}) => {
  const styles = useCAPThemeExamplesStyles();
  const selectedTheme = useCAPThemeSelection();

  // Map the selected theme label to our theme config
  const getSelectedThemeConfig = () => {
    if (selectedTheme.label === 'Visual Refresh (Teams)')
      return THEME_CONFIGS.teams;
    if (selectedTheme.label === 'Visual Refresh (OneDrive)')
      return THEME_CONFIGS.onedrive;
    if (selectedTheme.label === 'Visual Refresh (SharePoint)')
      return THEME_CONFIGS.sharepoint;
    return THEME_CONFIGS.current;
  };

  const selectedConfig = getSelectedThemeConfig();
  const themesToShow = [
    selectedConfig,
    THEME_CONFIGS.teams,
    THEME_CONFIGS.onedrive,
    THEME_CONFIGS.sharepoint,
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
  },
  row: {
    display: 'flex',
    '& > div': {
      flex: 1,
      padding: '16px',
      border: '1px solid #ddd',
    },
  },
});
