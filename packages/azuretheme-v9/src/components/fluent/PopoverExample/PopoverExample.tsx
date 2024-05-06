import * as React from "react";
import {
  makeStyles,
  shorthands,
  Button,
  Popover,
  PopoverSurface,
  useId,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import type { PositioningImperativeRef } from "@fluentui/react-components";
const useStyles = makeStyles({
  container: {
    display: "flex",
    ...shorthands.gap("10px"),
  },

  contentHeader: {
    marginTop: "0",
  },
});

export const PopoverExample = () => {
  const [open, setOpen] = React.useState(false);
  const headerId = useId();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const styles = useStyles();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  return (
    <div className={styles.container}>
      <Button
        {...restoreFocusTargetAttribute}
        ref={buttonRef}
        onClick={() => setOpen((s) => !s)}
      >
        Toggle popover
      </Button>
      <Popover
        onOpenChange={(_, data) => setOpen(data.open)}
        trapFocus
        open={open}
        positioning={{ positioningRef }}
      >
        <PopoverSurface aria-labelledby={headerId}>
          <div>
            <h3 id={headerId} className={styles.contentHeader}>
              Popover content
            </h3>

            <div>This is some popover content</div>
          </div>

          <div>
            <Button>Action</Button>
            <Button>Action</Button>
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
};