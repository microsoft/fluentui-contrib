import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSearch,
  AppLauncherSection,
} from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppTiles,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  apps,
  useActivatingLauncher,
} from './apps';

/**
 * The search field in every state, with the results laid out as tiles: the
 * field is controlled, so the stories' filtering is an application decision.
 * Typing filters the tiles, a miss shows the empty state, the clear button
 * empties the field and the first Escape clears the query before the second
 * Escape closes the panel. The kitchen-sink story shows the same states with
 * the results as list rows.
 */
export const SearchStates = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [query, setQuery] = React.useState('');

  const needle = query.trim().toLowerCase();
  const results = apps.filter((item) =>
    item.label.toLowerCase().includes(needle)
  );

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
          <AppLauncherSection>
            {results.length === 0 ? (
              <Text>No apps found</Text>
            ) : (
              <AppTiles items={results} onActivate={launcher.close} />
            )}
          </AppLauncherSection>
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Search states
        </Text>
        <Text>
          Type "bo" to filter the tiles down to Bookings, "zz" to see the empty
          state. The clear button and the first Escape clear the query; the
          second Escape closes the panel.
        </Text>
      </Captions>
    </Page>
  );
};
