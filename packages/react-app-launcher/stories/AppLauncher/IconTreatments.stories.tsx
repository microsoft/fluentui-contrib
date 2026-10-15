import * as React from 'react';
import { Text } from '@fluentui/react-components';
import {
  CalendarLtr20Regular,
  CalendarLtr32Regular,
  Document20Regular,
  Document32Regular,
  Folder20Regular,
  Folder32Regular,
  Globe20Regular,
  Globe32Regular,
  PeopleTeam20Regular,
  PeopleTeam32Regular,
  Settings20Regular,
  Settings32Regular,
  Video20Regular,
  Video32Regular,
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
import {
  ChatLogo,
  FilesLogo,
  InsightsLogo,
  MailLogo,
  NotesLogo,
  WhiteboardLogo,
} from './logos';

/** Monochrome Fluent icons — the default treatment applications reach for. */
const monochrome: AppEntry[] = [
  {
    label: 'Calendar',
    icon: <CalendarLtr32Regular />,
    smallIcon: <CalendarLtr20Regular />,
  },
  {
    label: 'Teams',
    icon: <PeopleTeam32Regular />,
    smallIcon: <PeopleTeam20Regular />,
  },
  {
    label: 'Documents',
    icon: <Document32Regular />,
    smallIcon: <Document20Regular />,
  },
  { label: 'Calls', icon: <Video32Regular />, smallIcon: <Video20Regular /> },
  { label: 'Sites', icon: <Globe32Regular />, smallIcon: <Globe20Regular /> },
  {
    label: 'Settings',
    icon: <Settings32Regular />,
    smallIcon: <Settings20Regular />,
  },
];

/** Colorful product logos — the item does not constrain the icon. */
const colorful: AppEntry[] = [
  { label: 'Mail', icon: <MailLogo />, smallIcon: <MailLogo size={20} /> },
  { label: 'Files', icon: <FilesLogo />, smallIcon: <FilesLogo size={20} /> },
  { label: 'Chat', icon: <ChatLogo />, smallIcon: <ChatLogo size={20} /> },
  { label: 'Notes', icon: <NotesLogo />, smallIcon: <NotesLogo size={20} /> },
  {
    label: 'Whiteboard',
    icon: <WhiteboardLogo />,
    smallIcon: <WhiteboardLogo size={20} />,
  },
  {
    label: 'Insights',
    icon: <InsightsLogo />,
    smallIcon: <InsightsLogo size={20} />,
  },
];

/** Long names: they wrap in tiles and end in an ellipsis in rows. */
const longLabels: AppEntry[] = [
  {
    label: 'Contoso Resource Planning',
    icon: <Folder32Regular />,
    smallIcon: <Folder20Regular />,
  },
  {
    label: 'Contoso Workspace Analytics',
    icon: <InsightsLogo />,
    smallIcon: <InsightsLogo size={20} />,
  },
];

/**
 * Icon treatments: monochrome Fluent icons beside colorful logos, in tiles
 * and in rows. The launcher renders whatever element the application passes
 * and does not constrain its size, so both treatments sit next to each other
 * without special cases. The last section shows long app names: a tile wraps
 * the name onto the next line, a row keeps one line and ends in an ellipsis.
 */
export const IconTreatments = () => {
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
          <AppLauncherSection title="Monochrome icons">
            <AppTiles items={monochrome} onActivate={launcher.close} />
          </AppLauncherSection>
          <AppLauncherSection title="Colorful logos" divider>
            <AppTiles items={colorful} onActivate={launcher.close} />
          </AppLauncherSection>
          <AppLauncherSection title="Long labels" divider>
            <AppTiles items={longLabels} onActivate={launcher.close} />
            <AppRows items={longLabels} onActivate={launcher.close} />
          </AppLauncherSection>
        </AppLauncher>
        <Brand />
      </AppBar>
      <Captions>
        <Text size={500} weight="semibold">
          Icon treatments
        </Text>
        <Text>
          Tiles pass a sized Fluent icon (32px) or a logo element; rows pass the
          20px variant through the same icon prop. Long names wrap in the
          two-line tile label and ellipsize on the single row line.
        </Text>
      </Captions>
    </Page>
  );
};
