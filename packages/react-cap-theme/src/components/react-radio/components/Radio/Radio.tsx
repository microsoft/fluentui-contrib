import { renderRadio_unstable } from "@fluentui/react-radio";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { RadioProps } from "./Radio.types";
import { useRadio } from "./useRadio";
import { useRadioStyles } from "./useRadioStyles.styles";

/**
 * The Radio component allows users to select a single option from a set of options.
 *
 * @param props - The props for the Radio component.
 * @param ref - Ref to the input element of the Radio.
 * @returns The rendered Radio component.
 * @alpha
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef(
	(props, ref) => {
		const state = useRadio(props, ref);

		useRadioStyles(state);

		useCustomStyleHook_unstable("useRadioStyles_unstable")(state);

		return renderRadio_unstable(state);
	},
);

Radio.displayName = "Radio";
