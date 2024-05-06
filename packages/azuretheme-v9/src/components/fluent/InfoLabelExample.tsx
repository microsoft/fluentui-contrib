import * as React from "react";

import { InfoLabel, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
  },
});

export const InfoLabelExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <InfoLabel size="small" info="Example small InfoLabel">
        Small label
      </InfoLabel>
      <InfoLabel size="medium" info="Example medium InfoLabel">
        Medium label
      </InfoLabel>
      <InfoLabel size="large" info="Example large InfoLabel">
        Large label
      </InfoLabel>
    </div>
  );
};