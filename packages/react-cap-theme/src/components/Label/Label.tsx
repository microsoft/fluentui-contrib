import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  Badge,
  Label as FluentLabel,
  mergeClasses,
} from '@fluentui/react-components';
import { CircleRegular } from '@fluentui/react-icons';
import { useLabelStyles } from './Label.styles';
import type { LabelProps } from './Label.types';

const defaultStart = (
  <Badge
    appearance="ghost"
    shape="rounded"
    size="medium"
    icon={<CircleRegular />}
  />
);

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ badge, showBadge = false, children, className, ...rest }, ref) => {
    const styles = useLabelStyles();
    const badgeContent = badge ?? (showBadge ? defaultStart : null);

    return (
      <FluentLabel
        {...rest}
        ref={ref}
        className={mergeClasses(styles.root, className)}
      >
        {badgeContent && (
          <span className={styles.startSlot}>{badgeContent}</span>
        )}
        {children}
      </FluentLabel>
    );
  }
) as ForwardRefComponent<LabelProps>;

Label.displayName = 'Label';
