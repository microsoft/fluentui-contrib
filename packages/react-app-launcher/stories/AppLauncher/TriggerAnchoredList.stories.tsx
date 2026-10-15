import * as React from 'react';
import { Text, makeStyles } from '@fluentui/react-components';
import { AppLauncher } from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppRows,
  Brand,
  Captions,
  LauncherTriggerButton,
  Page,
  apps,
  useActivatingLauncher,
} from './apps';

const useStyles = makeStyles({
  end: {
    marginInlineStart: 'auto',
  },
});

/**
 * Trigger anchoring: the launcher sits at the end of the bar but does not
 * dock to it. The panel anchors to the trigger and aligns with one of its
 * edges — here the end edge, so the panel's right side lines up with the
 * waffle. The content is a plain list of rows instead of a grid of tiles:
 * the blocks compose freely.
 */
export const TriggerAnchoredList = () => {
  const styles = useStyles();
  const launcher = useActivatingLauncher();

  return (
    <Page>
      <AppBar>
        <Brand />
        <div className={styles.end}>
          <AppLauncher
            trigger={<LauncherTriggerButton />}
            positioning={{ position: 'below', align: 'end' }}
            open={launcher.open}
            onOpenChange={launcher.onOpenChange}
          >
            <AppRows items={apps} onActivate={launcher.close} />
          </AppLauncher>
        </div>
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Trigger-anchored list
        </Text>
        <Text>
          The positioning prop selects the anchor edge: below-end opens the
          panel under the trigger, right edges aligned. The panel floats over
          the page — it is not docked to any window edge — and the content is a
          list of full-width rows instead of tiles. Activating a row closes the
          panel.
        </Text>
      </Captions>
    </Page>
  );
};
