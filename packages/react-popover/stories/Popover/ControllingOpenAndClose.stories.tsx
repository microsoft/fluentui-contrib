import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Checkbox } from '@fluentui/react-components';
import type { CheckboxProps } from '@fluentui/react-components';
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui-contrib/react-popover';
import type { PopoverProps } from '@fluentui-contrib/react-popover';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const ControllingOpenAndClose = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (e, data) =>
    setOpen(data.open || false);

  const onChange: CheckboxProps['onChange'] = (e, { checked }) => {
    setOpen(checked as boolean);
  };

  return (
    <div className={styles.container}>
      <Checkbox
        value="open"
        name="state"
        label="open"
        checked={open}
        onChange={onChange}
      />
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <button>Controlled trigger</button>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    </div>
  );
};
