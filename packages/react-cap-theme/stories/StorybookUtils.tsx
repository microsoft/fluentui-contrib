import * as React from 'react';
import {
  FluentProvider,
  makeStyles,
  mergeClasses,
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
}

const CAP_THEMES = {
  current: {
    label: 'Visual Refresh (Teams)',
    variant: 'v9' as const,
    theme: null,
    wrap: (children: React.ReactNode) => <>{children}</>,
  },
  teams: {
    label: 'Current',
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

type CAPVisualThemeKey = Exclude<CAPThemeKey, 'current'>;

export const CAPThemeComparisonSlider = ({
  example,
  capThemeKey = 'teams',
  initialPosition = 50,
  ariaLabel = 'Drag to compare current and visual refresh themes',
  beforeWrapper,
  afterWrapper,
  beforeLabel,
  afterLabel,
}: {
  example: CAPThemeExample;
  capThemeKey?: CAPVisualThemeKey;
  initialPosition?: number;
  ariaLabel?: string;
  beforeWrapper?: (content: React.ReactNode) => React.ReactNode;
  afterWrapper?: (content: React.ReactNode) => React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}) => {
  const styles = useCAPThemeComparisonSliderStyles();
  const [position, setPosition] = React.useState(initialPosition);
  const [isActive, setIsActive] = React.useState(false);

  const visualTheme = CAP_THEMES[capThemeKey] ?? CAP_THEMES.teams;
  const baseTheme = CAP_THEMES.current;
  const beforeLabelText = beforeLabel ?? baseTheme.label;
  const afterLabelText = afterLabel ?? visualTheme.label;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(event.target.value));
  };

  const handlePointerDown = () => setIsActive(true);
  const handlePointerUp = () => setIsActive(false);

  return (
    <div className={styles.comparisonRoot}>
      <div className={styles.frame}>
        <div className={mergeClasses(styles.badgeBase, styles.badgeBefore)}>
          {beforeLabelText}
        </div>
        <div className={mergeClasses(styles.badgeBase, styles.badgeAfter)}>
          {afterLabelText}
        </div>

        <div className={styles.layer}>
          <div className={styles.layerContent}>
            {beforeWrapper
              ? beforeWrapper(renderExample(example, 'v9'))
              : baseTheme.wrap(renderExample(example, 'v9'))}
          </div>
        </div>

        <div
          className={styles.overlay}
          style={{
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
          aria-hidden
        >
          <div className={styles.layerContent}>
            {afterWrapper
              ? afterWrapper(renderExample(example, 'cap'))
              : visualTheme.wrap(renderExample(example, 'cap'))}
          </div>
        </div>

        <div
          className={styles.slider}
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <div className={styles.sliderLine} />
          <div
            className={mergeClasses(
              styles.thumb,
              isActive ? styles.thumbActive : undefined
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-grip-vertical-icon lucide-grip-vertical"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
        </div>

        <input
          className={styles.range}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={handleChange}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onBlur={handlePointerUp}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
};

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

const useCAPThemeExamplesTableStyles = makeStyles({
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

const useCAPThemeComparisonSliderStyles = makeStyles({
  comparisonRoot: {
    width: '100%',
    maxWidth: '800px',
  },
  frame: {
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    isolation: 'isolate',
    minHeight: '96px',
  },
  layer: {
    position: 'relative',
    zIndex: 0,
  },
  layerContent: {
    padding: '20px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 1,
    transition: 'width 80ms ease-out',
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  sliderLine: {
    width: '1px',
    height: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
  },
  thumb: {
    position: 'relative',
    width: '10px',
    height: '16px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.35)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(-8px) translateY(-12px)',
    gap: '4px',
    padding: '2px 2px',
    backdropFilter: 'blur(4px)',
    transition:
      'transform 120ms ease, background-color 120ms ease, color 120ms ease',
    pointerEvents: 'none',
  },
  thumbActive: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    color: '#fff',
  },
  thumbArrow: {
    fontSize: '16px',
    lineHeight: 1,
  },
  thumbDivider: {
    width: '2px',
    height: '18px',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  thumbLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  range: {
    position: 'absolute',
    inset: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'ew-resize',
    zIndex: 3,
    appearance: 'none',
  },
  badgeBase: {
    position: 'absolute',
    bottom: '8px',
    padding: '0 8px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: 600,
    backgroundColor: 'rgba(0,0,0,0.65)',
    backdropFilter: 'blur(4px)',
    color: '#fff',
    zIndex: 4,
    pointerEvents: 'none',
  },
  badgeBefore: {
    left: '12px',
  },
  badgeAfter: {
    right: '12px',
  },
});
