import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  CalendarClock20Regular,
  CalendarClock24Regular,
  CalendarLtr20Regular,
  CalendarLtr32Regular,
} from '@fluentui/react-icons';
import {
  AppLauncher,
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
  useActivatingLauncher,
} from './apps';
import type { AppEntry } from './apps';
import { MailLogo } from './logos';

/**
 * The app set of the story: two apps that activate, and the two disabled
 * flavors that must never activate — a native-disabled item and a
 * `disabledFocusable` item, which is keyboard reachable but still inert.
 */
const items: AppEntry[] = [
  { label: 'Mail', icon: <MailLogo />, smallIcon: <MailLogo size={20} /> },
  {
    label: 'Calendar',
    icon: <CalendarLtr32Regular />,
    smallIcon: <CalendarLtr20Regular />,
  },
  {
    label: 'Bookings',
    icon: <CalendarClock24Regular />,
    smallIcon: <CalendarClock20Regular />,
    disabled: true,
  },
  {
    label: 'Bookings (focusable)',
    icon: <CalendarClock24Regular />,
    smallIcon: <CalendarClock20Regular />,
    disabledFocusable: true,
  },
];

/** One recorded activation: a number for a stable key and the item's label. */
type Activation = {
  id: number;
  label: string;
};

/**
 * Item activation: activating a tile or a row — clicking anywhere on the
 * item, its icon or its name — fires that item's `onClick`, which is the
 * application's hook for opening the app. The launcher itself holds no
 * navigation: it renders the items it is given and reports activations.
 *
 * Every activation is recorded in the log below the bar, newest first, and
 * closes the panel the way a launcher behaves. The disabled items never
 * appear in the log: a click on them does nothing — the `disabledFocusable`
 * item can be focused with the keyboard, but activating it is still a no-op.
 */
export const ItemActions = () => {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [log, setLog] = React.useState<Activation[]>([]);
  const nextId = React.useRef(0);

  const record = (item: AppEntry) => {
    nextId.current += 1;
    setLog((entries) =>
      [{ id: nextId.current, label: item.label }, ...entries].slice(0, 5)
    );
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
          <AppLauncherSection title="Tiles">
            <AppTiles items={items} onActivate={record} />
          </AppLauncherSection>
          <AppLauncherSection title="Rows" divider>
            <AppRows items={items} onActivate={record} />
          </AppLauncherSection>
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Item actions
        </Text>
        <Text>
          Open the waffle and activate a tile or a row: the log below records it
          and the panel closes. Clicking the icon and clicking the name both
          activate the same item — the whole item is one button. Bookings
          (disabled) and Bookings (focusable) never appear in the log; the
          focusable one takes keyboard focus but activating it does nothing.
        </Text>
        <Text weight="semibold">Activations (newest first):</Text>
        {log.length === 0 ? (
          <Text>Nothing activated yet.</Text>
        ) : (
          log.map((entry) => (
            <Text key={entry.id}>Activated: {entry.label}</Text>
          ))
        )}
      </Captions>
    </Page>
  );
};
