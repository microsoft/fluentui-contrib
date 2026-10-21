import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  AppLauncher,
  AppLauncherSection,
} from '@fluentui-contrib/react-app-launcher';
import type { AppEntry } from './apps';
import {
  AppBar,
  AppRows,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  apps,
  initialRecentLabels,
  useActivatingLauncher,
} from './apps';

/**
 * Controlled open state: the story owns `open` and `onOpenChange`, which is
 * what lets activating an app close the panel — the package cannot know that
 * an item was activated, because it receives plain children. Activations
 * also record the app as recently used: the new order is applied the next
 * time the panel opens, so the list never reshuffles under the pointer while
 * it is open.
 */
export const ControlledOpen = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const [recentLabels, setRecentLabels] = React.useState(initialRecentLabels);
  // Activations land here first; the order reaches the panel when it opens.
  const pendingRecentLabels = React.useRef(initialRecentLabels);
  const launcher = useActivatingLauncher(() =>
    setRecentLabels(pendingRecentLabels.current)
  );

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
          <AppLauncherSection title="Recently used">
            <AppRows items={recentApps} onActivate={recordUse} />
          </AppLauncherSection>
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Controlled open
        </Text>
        <Text>
          Activate an app: the panel closes and the app moves to the front of
          the recently used list. The current order is shown below, and the
          panel shows it the next time it opens — the order inside the open
          panel stays put while the pointer is over it.
        </Text>
        <Text weight="semibold">Recently used: {recentLabels.join(', ')}</Text>
      </Captions>
    </Page>
  );
};
