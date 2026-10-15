import * as React from 'react';
import { Text, makeStyles } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSearch,
  AppLauncherSection,
} from '@fluentui-contrib/react-app-launcher';
import {
  AppTiles,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  apps,
  useActivatingLauncher,
} from './apps';

const useStyles = makeStyles({
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
  },
});

/** One branded bar: the product name and its brand color. */
type BrandedBarProps = {
  name: string;
  color: string;
};

/**
 * The bars of the story: the neutral Contoso brand plus the suite's product
 * bars, each in its own brand color, so the trigger can be checked on light
 * and dark backgrounds.
 */
const brands: BrandedBarProps[] = [
  { name: 'Contoso', color: '#0f6cbd' },
  { name: 'Contoso Chat', color: '#5b5fc7' },
  { name: 'Contoso Docs', color: '#185abd' },
  { name: 'Contoso Sheets', color: '#107c41' },
  { name: 'Contoso Slides', color: '#c43e1c' },
];

/**
 * One application bar with its own launcher: the waffle is a transparent
 * Button restyled for the bar (see {@link LauncherTriggerButton}), and the
 * panel docks to the bar it was opened from.
 */
function BrandedBar({ name, color }: BrandedBarProps) {
  const styles = useStyles();
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [query, setQuery] = React.useState('');

  const needle = query.trim().toLowerCase();
  const results = apps.filter((item) =>
    item.label.toLowerCase().includes(needle)
  );

  return (
    <header
      ref={barRef}
      className={styles.bar}
      style={{ backgroundColor: color }}
    >
      <AppLauncher
        trigger={<LauncherTriggerButton label={`App launcher (${name})`} />}
        dockTarget={barRef}
        open={launcher.open}
        onOpenChange={launcher.onOpenChange}
      >
        <AppLauncherSearch
          label="Search apps"
          value={query}
          onChange={(_event, data) => setQuery(data.value)}
        />
        <AppLauncherSection>
          {results.length === 0 ? (
            <Text>No apps found</Text>
          ) : (
            <AppTiles items={results} onActivate={launcher.close} />
          )}
        </AppLauncherSection>
      </AppLauncher>
      <Brand name={name} />
    </header>
  );
}

/**
 * The launcher on application bars in different brand colors. The trigger
 * keeps its on-brand color while hovered, pressed and focused on every bar:
 * Fluent's transparent Button would otherwise repaint it with brand-hover
 * colors, which disappear on a colored bar. Open the launcher from each bar
 * — the panel docks to the bar it was opened from.
 */
export const BrandedBars = () => (
  <Page>
    {brands.map((brand) => (
      <BrandedBar key={brand.name} {...brand} />
    ))}
    <Captions>
      <Text size={500} weight="semibold">
        Branded bars
      </Text>
      <Text>
        Hover, press and focus each waffle: it stays on-brand on every bar
        color, with a soft white overlay as the interaction feedback. The panel
        docks to the bar it was opened from.
      </Text>
    </Captions>
  </Page>
);
