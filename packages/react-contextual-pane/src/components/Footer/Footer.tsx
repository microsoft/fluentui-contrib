import * as React from 'react';
import { Toolbar } from '@fluentui/react-components';
import { useStyles } from './Footer.styles';

export type FooterProps = {
  leftActions?: React.ReactNode;
  rightActions?: [React.ReactNode, React.ReactNode?];
  toolbarLables: {
    leftActionsAriaLabel?: string;
    rightActionsAriaLabel?: string;
  };
};

export const Footer = ({
  leftActions,
  rightActions,
  toolbarLables,
  children,
}: React.PropsWithChildren<FooterProps>): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.paneFooterRoot}>
      {children ? (
        children
      ) : (
        <>
          <Toolbar
            size="medium"
            aria-label={toolbarLables.leftActionsAriaLabel}
          >
            {leftActions}
          </Toolbar>
          <Toolbar
            size="medium"
            aria-label={toolbarLables.rightActionsAriaLabel}
          >
            {rightActions?.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </Toolbar>
        </>
      )}
    </div>
  );
};
