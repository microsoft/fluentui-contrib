import * as React from 'react';
import { useStyles } from './Header.styles';
import {
  mergeClasses,
  Toolbar,
  ToolbarButton,
} from '@fluentui/react-components';
import { ArrowLeftRegular, DismissRegular } from '@fluentui/react-icons';
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
  onArrowBackClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onDismissClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
  onArrowBackClick,
  onDismissClick,
}: HeaderProps): JSX.Element => {
  const styles = useStyles();

  const hasLeftConetent = Boolean(hasArrowBack || brandIcon);

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
                as="button"
                aria-label={toolbarLabels.arrowBackAriaLabel}
                icon={<ArrowLeftRegular />}
                onClick={onArrowBackClick}
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
          as="button"
          aria-label={toolbarLabels.dismissAriaLabel}
          icon={<DismissRegular />}
          appearance="transparent"
          onClick={onDismissClick}
        />
      </Toolbar>
    </div>
  );
};

Header.displayName = 'Header';
