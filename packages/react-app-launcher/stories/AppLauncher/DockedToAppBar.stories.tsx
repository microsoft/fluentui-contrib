import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSection,
} from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppTiles,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  allApps,
  pinnedApps,
  useActivatingLauncher,
} from './apps';

/**
 * Default docking: the panel anchors to the application bar instead of the
 * trigger, so it opens flush with the window's edge, directly below the bar.
 * The surface wraps its content, and a panel taller than the space left
 * below the bar stops at the window bottom and scrolls internally.
 */
export const DockedToAppBar = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();

  return (
    <Page>
      <AppBar ref={barRef}>
        <AppLauncher
          trigger={<LauncherTriggerButton />}
          dockTarget={barRef}
          open={launcher.open}
          onOpenChange={launcher.onOpenChange}
        >
          <AppLauncherSection title="Pinned">
            <AppTiles items={pinnedApps} onActivate={launcher.close} />
          </AppLauncherSection>
          <AppLauncherSection title="All apps" divider>
            <AppTiles items={allApps} onActivate={launcher.close} />
          </AppLauncherSection>
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Docked to the application bar
        </Text>
        <Text>
          A launcher in the application bar passes the bar element as its
          dockTarget: the panel opens flush with the window's edge beneath the
          bar, with its top corners rounded and its bottom corners square. The
          panel wraps its content until the space below the bar runs out, then
          it stops at the window bottom and scrolls inside instead of growing
          the page.
        </Text>
      </Captions>
    </Page>
  );
};
