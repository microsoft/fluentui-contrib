import * as React from "react";
import {
  Combobox,
  makeStyles,
  Option,
  shorthands,
  useId,
  Label
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",

    // gridTemplateRows: "auto auto",
  },
});

export const ComboboxExample = (props: Partial<ComboboxProps>) => {
  const comboId = useId("combo-default");
  const options = ["Cat", "Dog", "Ferret", "Fish", "Hamster", "Snake"];
  const styles = useStyles();

  const comboboxId = useId("combobox");
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        {...props}
      >
        {options.map((option) => (
          <Option key={option} disabled={option === "Ferret"}>
            {option}
          </Option>
        ))}
      </Combobox>

      <div>Clearable</div>
      <Label id={comboboxId}>Pick a color</Label>
      <Combobox
        clearable
        aria-labelledby={comboboxId}
        placeholder="Select a color"
      >
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  );
};