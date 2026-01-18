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

const FirstNestedPopover = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>First nested trigger</button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <button>First nested button</button>
        <SecondNestedPopover />
        <SecondNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

const SecondNestedPopover = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Second nested trigger</button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <button>Second nested button</button>
      </PopoverSurface>
    </Popover>
  );
};

export const NestedPopovers = (): JSXElement => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Root trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <button>Root button</button>
        <FirstNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

NestedPopovers.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Popovers can be nested within each other. Too much nesting can result in',
        'extra accessibility considerations and are generally not a great user experience,',
        '',
        'Since nested popovers will generally have an interactive `PopoverTrigger` to control',
        'the nested popover, make sure to combine their usage with the `trapFocus` prop for correct',
        'screen reader and keyboard accessibility.',
        '',
        '- Try and limit nesting to 2 levels.',
        '- Make sure to use `trapFocus` when nesting.',
        '- Creating nested popovers as separate components will result in more maintainable code.',
      ].join('\n'),
    },
  },
};
