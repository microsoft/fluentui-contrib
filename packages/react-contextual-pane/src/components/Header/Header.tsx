import * as React from 'react';
import { useStyles } from './Header.styles';
import { useNovaEventing } from '@nova/react';
import {
  mergeClasses,
  Slot,
  Toolbar,
  ToolbarButton,
  useEventCallback,
} from '@fluentui/react-components';
import { ArrowLeftRegular, DismissRegular } from '@fluentui/react-icons';
import * as events from '../../events';
import { HeaderTitle } from './HeaderTitle';

export type HeaderProps = {
  caption: string;
  brandIcon?: React.ReactNode;
  hasArrowBack?: boolean;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  toolbarLabels?: {
    dismissAriaLabel?: string;
    arrowBackAriaLabel?: string;
    actionsAriaLabel?: string;
    brandAriaLabel?: string;
  };
};

const defaultToolbarLabels = {
  dismissAriaLabel: 'Dismiss',
  arrowBackAriaLabel: 'Back',
  actionsAriaLabel: 'Actions',
  brandAriaLabel: 'Brand',
};

export const Header = ({
  caption,
  brandIcon,
  hasArrowBack,
  primaryAction,
  secondaryAction,
  toolbarLabels = defaultToolbarLabels,
}: HeaderProps) => {
  const styles = useStyles();
  const { bubble } = useNovaEventing();

  const hasLeftConetent = Boolean(hasArrowBack || brandIcon);

  const handleArrowBack = useEventCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      bubble({ reactEvent: e, event: events.arrowBack() });
    }
  );

  const handleDismiss = useEventCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      bubble({ reactEvent: e, event: events.dismissPane() });
    }
  );

  return (
    <div
      className={mergeClasses(
        styles.root,
        hasLeftConetent && styles.rootWithLeftContent
      )}
    >
      <div className={styles.titleContentWrapper}>
        {hasLeftConetent && (
          <Toolbar
            className={styles.brandToolbar}
            aria-label={toolbarLabels.brandAriaLabel}
            size="small"
          >
            {hasArrowBack && (
              <ToolbarButton
                aria-label={toolbarLabels.arrowBackAriaLabel}
                icon={<ArrowLeftRegular />}
                onClick={handleArrowBack}
                appearance="transparent"
              />
            )}
            {brandIcon && <span className={styles.brandIcon}>{brandIcon}</span>}
          </Toolbar>
        )}

        <HeaderTitle caption={caption} />
      </div>
      <Toolbar aria-label={toolbarLabels.actionsAriaLabel} size="small">
        {primaryAction}
        {secondaryAction}
        <ToolbarButton
          aria-label={toolbarLabels.dismissAriaLabel}
          icon={<DismissRegular />}
          onClick={handleDismiss}
          appearance="transparent"
        />
      </Toolbar>
    </div>
  );
};

Header.displayName = 'Header';
