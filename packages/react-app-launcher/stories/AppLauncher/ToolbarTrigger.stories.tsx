import * as React from 'react';
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  OverlayDrawer,
  Text,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  makeStyles,
} from '@fluentui/react-components';
import {
  GridDots20Regular,
  Home20Regular,
  Settings20Regular,
} from '@fluentui/react-icons';
import { AppLauncher } from '@fluentui-contrib/react-app-launcher';
import {
  AppBar,
  AppTiles,
  Brand,
  Captions,
  Page,
  apps,
  useActivatingLauncher,
} from './apps';

const useStyles = makeStyles({
  toolbarEnd: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 24px',
  },
});

/**
 * The trigger slot: a Fluent ToolbarButton replaces the built-in waffle, so
 * the launcher can live as one command of a toolbar — here in the header of
 * a non-modal OverlayDrawer, the way application suites host it. The panel
 * opens below that button, floating over the page.
 */
export const ToolbarTrigger = () => {
  const styles = useStyles();
  const launcher = useActivatingLauncher();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Page>
      <AppBar>
        <Brand />
      </AppBar>
      <OverlayDrawer
        modalType="non-modal"
        open={drawerOpen}
        position="start"
        onOpenChange={(_event, data) => setDrawerOpen(data.open)}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <Toolbar aria-label="Workspace commands">
              <Text weight="semibold">Contoso</Text>
              <ToolbarGroup role="presentation" className={styles.toolbarEnd}>
                <ToolbarButton aria-label="Home" icon={<Home20Regular />} />
                <AppLauncher
                  trigger={
                    <ToolbarButton
                      aria-label="App launcher"
                      icon={<GridDots20Regular />}
                    />
                  }
                  open={launcher.open}
                  onOpenChange={launcher.onOpenChange}
                >
                  <AppTiles
                    items={apps.slice(3, 9)}
                    onActivate={launcher.close}
                  />
                </AppLauncher>
                <ToolbarButton
                  aria-label="Settings"
                  icon={<Settings20Regular />}
                />
              </ToolbarGroup>
            </Toolbar>
          </DrawerHeaderNavigation>
        </DrawerHeader>
        <DrawerBody>
          <Text>
            The waffle in this drawer's toolbar opens the launcher below itself,
            floating over the page — anchored to the trigger, not to a bar.
          </Text>
        </DrawerBody>
      </OverlayDrawer>
      <div className={styles.controls}>
        <Button
          appearance="secondary"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? 'Close the drawer' : 'Open the drawer'}
        </Button>
      </div>
      <Captions>
        <Text size={500} weight="semibold">
          Toolbar trigger
        </Text>
        <Text>
          The trigger prop accepts any element that forwards props and a ref —
          the same contract Fluent's PopoverTrigger expects — so a ToolbarButton
          can replace the built-in waffle and keep the toolbar's keyboard
          behavior. Open the drawer to see the launcher as one command of the
          drawer's toolbar.
        </Text>
      </Captions>
    </Page>
  );
};
