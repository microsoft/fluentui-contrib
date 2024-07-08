import * as React from "react";

import {
  Field,
  Input,
  makeResetStyles,
  tokens,
  LabelProps,
  InfoLabel
} from "@fluentui/react-components";
import { SparkleFilled } from "@fluentui/react-icons";


const useStackClassName = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  rowGap: tokens.spacingVerticalL,
});

export const FieldExample = () => (
  <div className={useStackClassName()}>
    <Field label="Error state" validationMessage="This is an error message.">
      <Input />
    </Field>
    <Field
      label="Warning state"
      validationState="warning"
      validationMessage="This is a warning message."
    >
      <Input />
    </Field>
    <Field
      label="Success state"
      validationState="success"
      validationMessage="This is a success message."
    >
      <Input />
    </Field>
    <Field
      label="Custom state"
      validationState="none"
      validationMessageIcon={<SparkleFilled />}
      validationMessage="This is a custom message."
    >
      <Input />
    </Field>
    <Field
        label={{
        // Setting children to a render function allows you to replace the entire slot.
        // The first param is the component for the slot (Label), which we're ignoring to use InfoLabel instead.
        // The second param are the props for the slot, which need to be passed to the InfoLabel.
        children: (_: unknown, slotProps: LabelProps) => (
            <InfoLabel {...slotProps} info="Example info">
            Field with an info button
            </InfoLabel>
        ),
        }}
    >
        <Input />
    </Field>
  </div>
);