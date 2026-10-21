import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSearch,
} from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppTiles,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  stressApps,
  useActivatingLauncher,
} from './apps';

/**
 * Full docking: the panel extends from the bar down to the window bottom and
 * scrolls internally. The search field stays pinned to the panel's top while
 * the tiles scroll under it, and every tenth tile stands in for an app
 * disabled by business rules.
 */
export const FullDock = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [query, setQuery] = React.useState('');

  const needle = query.trim().toLowerCase();
  const results = stressApps.filter((item) =>
    item.label.toLowerCase().includes(needle)
  );

  return (
    <Page>
      <AppBar ref={barRef}>
        <AppLauncher
          trigger={<LauncherTriggerButton label="App launcher (full dock)" />}
          docking="full"
          dockTarget={barRef}
          open={launcher.open}
          onOpenChange={launcher.onOpenChange}
        >
          <AppLauncherSearch
            label="Search apps"
            value={query}
            onChange={(_event, data) => setQuery(data.value)}
          />
          <AppTiles
            items={needle === '' ? stressApps : results}
            onActivate={launcher.close}
          />
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Full dock
        </Text>
        <Text>
          With docking="full" the panel is forced to extend from the bar to the
          window bottom — Microsoft 365 style. The 40 tiles scroll inside the
          panel, and the search field stays pinned to the panel's top while they
          scroll under it. Typing filters the tiles.
        </Text>
      </Captions>
    </Page>
  );
};
