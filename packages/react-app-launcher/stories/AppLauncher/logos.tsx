import * as React from 'react';
import type { ReactElement } from 'react';

/**
 * Props shared by the sample logos below.
 */
export type AppLauncherLogoProps = {
  /**
   * Edge length of the square logo in pixels. The default suits the grid
   * tiles; the compact list rows pass 20.
   */
  size?: number;
};

/**
 * Hand-drawn sample logos for the launcher stories.
 *
 * The launcher does not constrain the icon it renders, so an application can
 * pass a monochrome Fluent icon or a colorful product logo element. These
 * small SVG marks stand in for real product logos so the stories can show
 * both treatments side by side: a white glyph on a colored rounded square,
 * simple enough to keep the examples readable.
 *
 * Each logo scales with the `size` prop and is hidden from assistive
 * technology, because the item label already carries the accessible name.
 */

/** White envelope on a blue square — stands in for a mail app logo. */
export function MailLogo({ size = 40 }: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#2563eb" />
      <rect x="9" y="13" width="22" height="14" rx="2" fill="#ffffff" />
      <path
        d="M10 15l10 7 10-7"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** White folder on an amber square — stands in for a file storage logo. */
export function FilesLogo({ size = 40 }: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#f59e0b" />
      <path
        d="M9 15.5A2.5 2.5 0 0 1 11.5 13h5.4l2.6 3h8A2.5 2.5 0 0 1 30 18.5v7A2.5 2.5 0 0 1 27.5 28h-16A2.5 2.5 0 0 1 9 25.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** White speech bubble on a green square — stands in for a chat logo. */
export function ChatLogo({ size = 40 }: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#10b981" />
      <rect x="9" y="12" width="22" height="15" rx="3.5" fill="#ffffff" />
      <path d="M14.5 26.5l3.2 4.5V26.5z" fill="#ffffff" />
      <circle cx="15.5" cy="19.5" r="1.6" fill="#10b981" />
      <circle cx="20" cy="19.5" r="1.6" fill="#10b981" />
      <circle cx="24.5" cy="19.5" r="1.6" fill="#10b981" />
    </svg>
  );
}

/** White page with writing lines on a rose square — stands in for a notes logo. */
export function NotesLogo({ size = 40 }: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#e11d48" />
      <rect x="11" y="9" width="18" height="22" rx="3" fill="#ffffff" />
      <rect x="14.5" y="14.5" width="11" height="1.8" rx="0.9" fill="#e11d48" />
      <rect x="14.5" y="19" width="11" height="1.8" rx="0.9" fill="#e11d48" />
      <rect x="14.5" y="23.5" width="7" height="1.8" rx="0.9" fill="#e11d48" />
    </svg>
  );
}

/** White board with a scribble on a violet square — stands in for a whiteboard logo. */
export function WhiteboardLogo({
  size = 40,
}: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#7c3aed" />
      <rect x="9" y="10" width="22" height="16" rx="2.5" fill="#ffffff" />
      <path
        d="M13 21.5c2.2-4.4 4.2-6.6 6.2-6.6 1.8 0 2.5 2.6 4.2 2.6 1.3 0 2.4-1.1 3.6-3.2"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 29l3.5-3 3.5 3"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Rising white bars on an orange square — stands in for an analytics logo. */
export function InsightsLogo({
  size = 40,
}: AppLauncherLogoProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#ea580c" />
      <rect x="12" y="21" width="4" height="8" rx="1.4" fill="#ffffff" />
      <rect x="18" y="16" width="4" height="13" rx="1.4" fill="#ffffff" />
      <rect x="24" y="12" width="4" height="17" rx="1.4" fill="#ffffff" />
    </svg>
  );
}
