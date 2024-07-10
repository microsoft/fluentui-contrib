import * as React from 'react';
import { Link } from '@fluentui/react-components';
import type { LinkProps } from '@fluentui/react-components';

export const LinkExample = (props: LinkProps & { as?: 'a' }) => (
  <>
    <Link href="https://www.bing.com" {...props}>
      This is a link
    </Link>
    <Link disabled href="https://www.bing.com">
      Disabled link
    </Link>
  </>
);
