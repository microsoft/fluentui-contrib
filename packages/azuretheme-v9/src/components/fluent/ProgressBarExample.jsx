import * as React from "react";
import {
    Field,
    ProgressBar,
    makeStyles,
    shorthands,
    styles
} from "@fluentui/react-components";

const useStyles = makeStyles({
    container: {
      ...shorthands.margin("20px", "0px"),
    },
  });

export const ProgressBarExample = (props) => {

    const styles = useStyles();
    return (
        <>
        <Field validationMessage="Default ProgressBar" validationState="none">
            <ProgressBar {...props} value={0.5} />
        </Field>
        <Field validationMessage="Error ProgressBar">
            <ProgressBar value={0.75} color="error" />
        </Field>
        <Field validationMessage="Warning ProgressBar" validationState="warning">
            <ProgressBar value={0.95} color="warning" />
        </Field>
        <Field validationMessage="Success ProgressBar" validationState="success">
            <ProgressBar value={1} color="success" />
        </Field>
        <Field validationMessage="Medium ProgressBar" validationState="none">
            <ProgressBar
            className={styles.container}
            thickness="medium"
            value={0.7}
            />
        </Field>

        <Field validationMessage="Large ProgressBar" validationState="none">
            <ProgressBar
            className={styles.container}
            thickness="large"
            value={0.7}
            />
        </Field>
        </>
    );
};