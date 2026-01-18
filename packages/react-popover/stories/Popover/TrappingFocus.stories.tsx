import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, useId } from '@fluentui/react-components';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui-contrib/react-popover';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

export const TrappingFocus = (): JSXElement => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>

        <div>
          <button>Action</button>
          <button>Action</button>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
