import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSearch,
  AppLauncherSection,
} from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppRows,
  AppTiles,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  allApps,
  apps,
  initialRecentLabels,
  pinnedApps,
  useActivatingLauncher,
} from './apps';
import type { AppEntry } from './apps';

/**
 * The Microsoft 365 flow in one panel: a search field over the recent rows,
 * the pinned tiles and the full app grid while the query is empty, and a
 * result list while searching. Escape clears the query before the second
 * Escape closes the panel.
 *
 * The open state is controlled so activating an app closes the panel, the
 * way a launcher behaves, and so the recent order is applied when the panel
 * opens — the list never reshuffles under the pointer while it is open.
 *
 * The story deliberately keeps all of that state here, not in the package:
 * which apps exist, when one is disabled, what "recent" means and what a
 * query matches are application decisions.
 */
export const KitchenSink = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const [query, setQuery] = React.useState('');
  const [recentLabels, setRecentLabels] = React.useState(initialRecentLabels);
  // Activations land here first; the order reaches the panel when it opens.
  const pendingRecentLabels = React.useRef(initialRecentLabels);
  const launcher = useActivatingLauncher(() =>
    setRecentLabels(pendingRecentLabels.current)
  );

  const needle = query.trim().toLowerCase();
  const results =
    needle === ''
      ? []
      : apps.filter((item) => item.label.toLowerCase().includes(needle));
  const recentApps = recentLabels
    .map((label) => apps.find((item) => item.label === label))
    .filter((item): item is AppEntry => item !== undefined);

  const recordUse = (item: AppEntry) => {
    pendingRecentLabels.current = [
      item.label,
      ...pendingRecentLabels.current.filter((label) => label !== item.label),
    ].slice(0, 5);
    launcher.close();
  };

  return (
    <Page>
      <AppBar ref={barRef}>
        <AppLauncher
          trigger={<LauncherTriggerButton />}
          dockTarget={barRef}
          open={launcher.open}
          onOpenChange={launcher.onOpenChange}
        >
          <AppLauncherSearch
            label="Search apps"
            value={query}
            onChange={(_event, data) => setQuery(data.value)}
          />
          {needle === '' ? (
            <>
              <AppLauncherSection title="Recent">
                <AppRows items={recentApps} onActivate={recordUse} />
              </AppLauncherSection>
              <AppLauncherSection title="Pinned" divider>
                <AppTiles items={pinnedApps} onActivate={recordUse} />
              </AppLauncherSection>
              <AppLauncherSection title="All apps" divider>
                <AppTiles items={allApps} onActivate={recordUse} />
              </AppLauncherSection>
            </>
          ) : (
            <AppLauncherSection>
              {results.length === 0 ? (
                <Text>No apps found</Text>
              ) : (
                <AppRows items={results} onActivate={recordUse} />
              )}
            </AppLauncherSection>
          )}
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Kitchen sink
        </Text>
        <Text>
          Open the waffle: the panel docks to the bar with the recent rows, the
          pinned tiles and the full app grid. Typing filters every app into a
          result list, with "No apps found" for a miss; the clear button and the
          first Escape clear the query, the second Escape closes the panel.
          Activating an app closes the panel and records it in the recent list,
          whose new order appears the next time the panel opens. Bookings and
          Insights are disabled from business rules; Bookings (focusable) stays
          keyboard reachable.
        </Text>
      </Captions>
    </Page>
  );
};
