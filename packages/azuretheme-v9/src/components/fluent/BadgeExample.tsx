import * as React from 'react';

import { Badge } from '@fluentui/react-components';
import type { BadgeProps } from '@fluentui/react-components';
import { PresenceBadge } from '@fluentui/react-components';

export const BadgeExample = (props: BadgeProps) => {
  return (
    <>
      <div>Default</div>
      <Badge {...props} />
      <div>
        A badge can have a ghost, filled, outline, or tint appearance. The
        default is filled.{' '}
      </div>
      <Badge appearance="filled">999+</Badge>
      <Badge appearance="ghost">999+</Badge>
      <Badge appearance="outline">999+</Badge>
      <Badge appearance="tint">999+</Badge>
      <div>
        A badge can have square, rounded or circular shape. The default is
        circular.
      </div>

      <Badge shape="square" />
      <Badge shape="rounded" />
      <Badge shape="circular" />

      <div>
        A badge can have different colors. The available colors are brand,
        danger, important, informative, severe, subtle, success or warning. The
        default is brand. Information conveyed by color should also be
        communicated in another way to meet accessibility requirements.
      </div>
      <Badge appearance="filled" color="brand">
        999+
      </Badge>
      <Badge appearance="filled" color="danger">
        999+
      </Badge>
      <Badge appearance="filled" color="important">
        999+
      </Badge>
      <Badge appearance="filled" color="informative">
        999+
      </Badge>
      <Badge appearance="filled" color="severe">
        999+
      </Badge>
      <Badge appearance="filled" color="subtle">
        999+
      </Badge>
      <Badge appearance="filled" color="success">
        999+
      </Badge>
      <Badge appearance="filled" color="warning">
        999+
      </Badge>

      <div>
        A presence badge supports available, away, busy, do-not-disturb,
        offline, out-of-office, blocked and unknown status. The default is
        available.
      </div>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="do-not-disturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="out-of-office" />
      <PresenceBadge status="blocked" />
      <PresenceBadge status="unknown" />

      <div>
        A presence badge supports available, away, busy, do-not-disturb,
        offline, out-of-office, blocked and unknown status when outOfOffice is
        set.
      </div>
      <PresenceBadge outOfOffice status="available" />
      <PresenceBadge outOfOffice status="away" />
      <PresenceBadge outOfOffice status="busy" />
      <PresenceBadge outOfOffice status="do-not-disturb" />
      <PresenceBadge outOfOffice status="offline" />
      <PresenceBadge outOfOffice status="out-of-office" />
      <PresenceBadge outOfOffice status="blocked" />
      <PresenceBadge outOfOffice status="unknown" />
    </>
  );
};
