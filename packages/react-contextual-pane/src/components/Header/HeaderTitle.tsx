import * as React from 'react';
import { Tooltip, TooltipProps } from '@fluentui/react-components';
import { useStyles } from './Header.styles';
import { useEllipsisCheck } from '../../lib/useEllipsisCheck';

export type HeaderTitleProps = {
  caption: string;
};

export function HeaderTitle({ caption }: HeaderTitleProps) {
  const [titleHasEllipsis, titleRef] = useEllipsisCheck();
  const [isVisibleTooltip, setIsVisibleTooltip] = React.useState(false);

  const styles = useStyles();

  const handleTooltipVisibleChange: TooltipProps['onVisibleChange'] = (
    _,
    data
  ) => {
    setIsVisibleTooltip(data.visible);
  };

  return (
    <Tooltip
      content={caption}
      relationship="description"
      visible={titleHasEllipsis && isVisibleTooltip}
      onVisibleChange={handleTooltipVisibleChange}
    >
      <span
        className={styles.title}
        data-testid="header-title-tooltip"
        ref={titleRef}
        {...(titleHasEllipsis ? { tabIndex: 0, role: 'heading' } : {})}
      >
        {caption}
      </span>
    </Tooltip>
  );
}
