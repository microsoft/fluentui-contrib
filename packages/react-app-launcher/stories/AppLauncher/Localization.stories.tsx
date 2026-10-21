import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  CalendarLtr20Regular,
  CalendarLtr32Regular,
  Settings20Regular,
  Settings32Regular,
} from '@fluentui/react-icons';
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
  apps,
  pinnedApps,
  useActivatingLauncher,
} from './apps';
import type { AppEntry } from './apps';
import { ChatLogo, FilesLogo, MailLogo, NotesLogo } from './logos';

/**
 * The German example: the launcher chrome is localized — the trigger label,
 * the search field's name and placeholder, the clear button's accessible
 * name and the empty state — while the app set keeps its original names.
 */
function GermanExample() {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [query, setQuery] = React.useState('');

  const needle = query.trim().toLowerCase();
  const results = apps.filter((item) =>
    item.label.toLowerCase().includes(needle)
  );

  return (
    <AppBar ref={barRef}>
      <AppLauncher
        trigger={<LauncherTriggerButton label="App-Starter" />}
        dockTarget={barRef}
        open={launcher.open}
        onOpenChange={launcher.onOpenChange}
      >
        <AppLauncherSearch
          label="Apps durchsuchen"
          placeholder="Suchen"
          dismiss={{ 'aria-label': 'Eingabe löschen' }}
          value={query}
          onChange={(_event, data) => setQuery(data.value)}
        />
        {needle === '' ? (
          <AppTiles items={pinnedApps} onActivate={launcher.close} />
        ) : results.length === 0 ? (
          <Text>Keine Apps gefunden</Text>
        ) : (
          <AppRows items={results} onActivate={launcher.close} />
        )}
      </AppLauncher>
      <Brand />
    </AppBar>
  );
}

/**
 * The app set of the Armenian example: the item labels are localized too, so
 * the whole launcher reads Armenian — the application passes the names it
 * wants to show.
 */
const armenianApps: AppEntry[] = [
  { label: 'Փոստ', icon: <MailLogo />, smallIcon: <MailLogo size={20} /> },
  {
    label: 'Օրացույց',
    icon: <CalendarLtr32Regular />,
    smallIcon: <CalendarLtr20Regular />,
  },
  { label: 'Ֆայլեր', icon: <FilesLogo />, smallIcon: <FilesLogo size={20} /> },
  { label: 'Զրույց', icon: <ChatLogo />, smallIcon: <ChatLogo size={20} /> },
  {
    label: 'Նշումներ',
    icon: <NotesLogo />,
    smallIcon: <NotesLogo size={20} />,
  },
  {
    label: 'Կարգավորումներ',
    icon: <Settings32Regular />,
    smallIcon: <Settings20Regular />,
  },
];

/**
 * The Armenian example: the bar, the launcher chrome and the app names are
 * all localized, so the whole launcher reads Armenian end to end.
 */
function ArmenianExample() {
  const barRef = React.useRef<HTMLElement>(null);
  const launcher = useActivatingLauncher();
  const [query, setQuery] = React.useState('');

  const needle = query.trim().toLowerCase();
  const results = armenianApps.filter((item) =>
    item.label.toLowerCase().includes(needle)
  );

  return (
    <AppBar ref={barRef}>
      <AppLauncher
        trigger={<LauncherTriggerButton label="Հավելվածների գործարկիչ" />}
        dockTarget={barRef}
        open={launcher.open}
        onOpenChange={launcher.onOpenChange}
      >
        <AppLauncherSearch
          label="Որոնել հավելվածներ"
          placeholder="Որոնել"
          dismiss={{ 'aria-label': 'Մաքրել որոնումը' }}
          value={query}
          onChange={(_event, data) => setQuery(data.value)}
        />
        <AppLauncherSection>
          {results.length === 0 ? (
            <Text>Հավելվածներ չեն գտնվել</Text>
          ) : (
            <AppTiles items={results} onActivate={launcher.close} />
          )}
        </AppLauncherSection>
      </AppLauncher>
      <Brand name="Կոնտոսո" />
    </AppBar>
  );
}

/**
 * Every user-facing string is a prop, so the launcher localizes without
 * resource files. Two examples: German localizes the launcher chrome — the
 * trigger label, the search field's name and placeholder, the clear button's
 * accessible name and the empty state; Armenian localizes the bar and the
 * app names as well, so the whole launcher reads Armenian.
 */
export const Localization = () => (
  <Page>
    <GermanExample />
    <ArmenianExample />
    <Captions>
      <Text size={500} weight="semibold">
        Localization
      </Text>
      <Text>
        The package ships no localized text and English defaults; the
        application passes every string — the trigger label, the search field's
        name and placeholder, the clear button's accessible name, the empty
        state and the app names. Both examples filter as you type; a query that
        matches nothing shows the localized empty state.
      </Text>
    </Captions>
  </Page>
);
