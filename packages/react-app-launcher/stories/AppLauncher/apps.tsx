import {
  CalendarClock20Regular,
  CalendarClock24Regular,
  CalendarLtr20Regular,
  CalendarLtr32Regular,
  Document20Regular,
  Document32Regular,
  Folder20Regular,
  Folder32Regular,
  Globe20Regular,
  Globe32Regular,
  GridDots20Regular,
  Mail32Regular,
  PeopleTeam20Regular,
  PeopleTeam32Regular,
  Settings20Regular,
  Settings32Regular,
  Video20Regular,
  Video32Regular,
} from '@fluentui/react-icons';
import {
  AppLauncherGrid,
  AppLauncherItem,
  AppLauncherList,
} from '@fluentui-contrib/react-app-launcher';
import type { AppLauncherProps } from '@fluentui-contrib/react-app-launcher';
import { Button, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';
import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  ChatLogo,
  FilesLogo,
  InsightsLogo,
  MailLogo,
  NotesLogo,
  WhiteboardLogo,
} from './logos';

/**
 * One app of the sample sets: the label the item shows, the icon sized for
 * the layout it appears in, and the disabled flavors.
 */
export type AppEntry = {
  label: string;
  /** Icon sized for the grid tiles — a Fluent `*32` icon or a logo. */
  icon: ReactElement;
  /**
   * Optional smaller icon sized for the compact list rows (`*20` Fluent
   * icons, or a logo at `size={20}`). The stress sample omits it and falls
   * back to `icon`.
   */
  smallIcon?: ReactElement;
  /**
   * When true the item renders disabled: muted, unfocusable and never
   * activating.
   */
  disabled?: boolean;
  /**
   * When true the item renders `disabledFocusable`: announced disabled and
   * never activating, but still reachable with the keyboard.
   */
  disabledFocusable?: boolean;
};

/**
 * Apps of the stories, sized like the Microsoft 365 launcher tiles.
 *
 * The icons deliberately mix the two treatments an application can pass: a
 * monochrome Fluent icon, or a colorful logo element. `Bookings` and
 * `Insights` render disabled, so the disabled look sits next to the enabled
 * tiles; `Bookings (focusable)` renders `disabledFocusable` beside `Bookings`
 * so the two disabled flavors can be compared, and `Contoso Resource
 * Planning` carries a deliberately long name to compare wrapping (tiles)
 * with ellipsizing (rows).
 */
export const apps: AppEntry[] = [
  { label: 'Mail', icon: <MailLogo />, smallIcon: <MailLogo size={20} /> },
  {
    label: 'Calendar',
    icon: <CalendarLtr32Regular />,
    smallIcon: <CalendarLtr20Regular />,
  },
  { label: 'Files', icon: <FilesLogo />, smallIcon: <FilesLogo size={20} /> },
  {
    label: 'Teams',
    icon: <PeopleTeam32Regular />,
    smallIcon: <PeopleTeam20Regular />,
  },
  { label: 'Chat', icon: <ChatLogo />, smallIcon: <ChatLogo size={20} /> },
  {
    label: 'Documents',
    icon: <Document32Regular />,
    smallIcon: <Document20Regular />,
  },
  { label: 'Calls', icon: <Video32Regular />, smallIcon: <Video20Regular /> },
  { label: 'Notes', icon: <NotesLogo />, smallIcon: <NotesLogo size={20} /> },
  { label: 'Sites', icon: <Globe32Regular />, smallIcon: <Globe20Regular /> },
  // The CalendarClock family has no 32px size at the icon version this
  // repository supports (2.0.260), so the tile uses the 24px glyph.
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
  {
    label: 'Whiteboard',
    icon: <WhiteboardLogo />,
    smallIcon: <WhiteboardLogo size={20} />,
  },
  {
    label: 'Contoso Resource Planning',
    icon: <Folder32Regular />,
    smallIcon: <Folder20Regular />,
  },
  {
    label: 'Settings',
    icon: <Settings32Regular />,
    smallIcon: <Settings20Regular />,
  },
  {
    label: 'Insights',
    icon: <InsightsLogo />,
    smallIcon: <InsightsLogo size={20} />,
    disabled: true,
  },
];

/** Apps pinned to the top of the kitchen-sink story. */
export const pinnedApps = apps.slice(0, 3);

/** The remaining apps, shown under the "All apps" title. */
export const allApps = apps.slice(3);

/** The apps the kitchen-sink story treats as recently used on first open. */
export const initialRecentLabels = ['Mail', 'Calendar', 'Chat'];

/**
 * Icon cycle for the full-dock story. Stored as components rather than JSX
 * elements so the list is not mistaken for renderable content.
 */
const stressIcons = [
  Mail32Regular,
  CalendarLtr32Regular,
  Globe32Regular,
  PeopleTeam32Regular,
  Video32Regular,
  Document32Regular,
];

/** Enough tiles to make the full docking story scroll. */
export const stressApps: AppEntry[] = Array.from({ length: 40 }, (_, index) => {
  const Icon = stressIcons[index % stressIcons.length] ?? Mail32Regular;

  return {
    label: `App ${index + 1}`,
    icon: <Icon />,
    // Every tenth tile stands in for an app disabled by business rules.
    disabled: (index + 1) % 10 === 0,
  };
});

/**
 * Keeps the open state of a story launcher so activating an app closes the
 * panel, the way a launcher behaves. The package leaves that behavior to the
 * application: it renders whatever the caller composes and cannot know that
 * an item was activated.
 *
 * @param onOpen - called right before the panel opens, for state that should
 *   be applied at open time (the recent order in the kitchen-sink story)
 * @returns the open state, the change handler and a close helper for clicks
 */
export function useActivatingLauncher(onOpen?: () => void) {
  const [open, setOpen] = React.useState(false);

  const onOpenChange: NonNullable<AppLauncherProps['onOpenChange']> = (
    _event,
    data
  ) => {
    if (data.open) {
      onOpen?.();
    }
    setOpen(data.open);
  };

  return { open, onOpenChange, close: () => setOpen(false) };
}

/**
 * Lays a list of apps out as launcher tiles.
 *
 * @param props - component props
 * @param props.items - apps to render
 * @param props.onActivate - called with the app when its tile is activated
 */
export function AppTiles({
  items,
  onActivate,
}: {
  items: AppEntry[];
  onActivate?: (item: AppEntry) => void;
}) {
  return (
    <AppLauncherGrid>
      {items.map((item) => (
        <AppLauncherItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          disabled={item.disabled}
          disabledFocusable={item.disabledFocusable}
          onClick={onActivate ? () => onActivate(item) : undefined}
        />
      ))}
    </AppLauncherGrid>
  );
}

/**
 * Lays a list of apps out as launcher rows.
 *
 * @param props - component props
 * @param props.items - apps to render
 * @param props.onActivate - called with the app when its row is activated
 */
export function AppRows({
  items,
  onActivate,
}: {
  items: AppEntry[];
  onActivate?: (item: AppEntry) => void;
}) {
  return (
    <AppLauncherList>
      {items.map((item) => (
        <AppLauncherItem
          key={item.label}
          label={item.label}
          icon={item.smallIcon ?? item.icon}
          disabled={item.disabled}
          disabledFocusable={item.disabledFocusable}
          onClick={onActivate ? () => onActivate(item) : undefined}
        />
      ))}
    </AppLauncherList>
  );
}

const useFrameStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    backgroundColor: tokens.colorBrandBackground,
  },
  brand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  // The trigger sits on the brand bar, so it must keep its on-brand colors
  // in every interaction state: Fluent's transparent Button repaints its
  // foreground with brand-hover colors on hover and press, which vanish on a
  // brand-colored bar. The `&.fui-Button` selectors outrank the Button's own
  // `:hover` rules, and the icon pins its own color through `waffle` so it
  // cannot be repainted by inheritance.
  trigger: {
    color: tokens.colorNeutralForegroundOnBrand,
    '&.fui-Button:hover': {
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    '&.fui-Button:hover:active': {
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: 'rgba(255, 255, 255, 0.22)',
    },
  },
  waffle: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '560px',
    margin: '24px',
    padding: '16px',
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

/**
 * A minimal application bar in the Contoso brand blue: the context the
 * launcher docks to in the stories. The forwarded ref points at the bar
 * element, so a story can pass it as the launcher's `dockTarget`.
 */
export const AppBar = React.forwardRef<HTMLElement, { children?: ReactNode }>(
  function AppBar({ children }, ref) {
    const styles = useFrameStyles();

    return (
      <header ref={ref} className={styles.bar}>
        {children}
      </header>
    );
  }
);

/**
 * The application name shown in the bar, in the on-brand foreground color.
 */
export function Brand({ name = 'Contoso' }: { name?: string }) {
  const styles = useFrameStyles();

  return (
    <Text className={styles.brand} weight="semibold">
      {name}
    </Text>
  );
}

/**
 * The waffle trigger styled for the brand-colored bar: a transparent Button
 * whose icon keeps the on-brand color in every state, with a soft white
 * overlay as the hover and press feedback.
 *
 * Forwards its props and ref to the Button, which is the contract the
 * launcher requires of a caller-provided trigger: `PopoverTrigger` injects
 * event handlers and its anchor ref into the element it renders.
 *
 * @param props - component props plus anything the launcher injects
 * @param props.label - accessible name of the trigger
 * @param ref - ref to the root button element, forwarded to the Button
 */
export const LauncherTriggerButton = React.forwardRef<
  HTMLButtonElement,
  { label?: string } & Omit<ButtonProps, 'appearance' | 'icon'>
>(function LauncherTriggerButton({ label = 'App launcher', ...rest }, ref) {
  const styles = useFrameStyles();

  return (
    <Button
      {...rest}
      ref={ref}
      appearance="transparent"
      aria-label={label}
      className={styles.trigger}
      icon={<GridDots20Regular className={styles.waffle} />}
    />
  );
});

/**
 * A page frame for a launcher story: the neutral surface applications mount
 * the launcher into.
 */
export function Page({ children }: { children: ReactNode }) {
  const styles = useFrameStyles();

  return <div className={styles.page}>{children}</div>;
}

/**
 * The caption card under a launcher: what the story demonstrates, in a
 * content card on the page background.
 */
export function Captions({ children }: { children: ReactNode }) {
  const styles = useFrameStyles();

  return <div className={styles.card}>{children}</div>;
}
