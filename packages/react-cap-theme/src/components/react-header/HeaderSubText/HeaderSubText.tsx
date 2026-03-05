import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { HeaderSubTextProps } from "./HeaderSubText.types";
import { renderHeaderSubText } from "./renderHeaderSubText";
import { useHeaderSubText } from "./useHeaderSubText";
import { useHeaderSubTextStyles } from "./useHeaderSubTextStyles.styles";

/**
 * A HeaderSubText provides supplemental text content that can optionally collapse based on header state.
 *
 * @example
 * ```tsx
 * import { Header, HeaderTitle, HeaderSubText } from '@fluentui-contrib/react-cap-theme/react-header';
 *
 * <Header collapsible>
 *   <HeaderTitle>Main Title</HeaderTitle>
 *   <HeaderSubText>This text can collapse when the header is collapsed</HeaderSubText>
 * </Header>
 * ```
 *
 * @alpha
 */
export const HeaderSubText: ForwardRefComponent<HeaderSubTextProps> =
	React.forwardRef((props, ref) => {
		const state = useHeaderSubText(props, ref);
		const styledState = useHeaderSubTextStyles(state);
		return renderHeaderSubText(styledState);
	});

HeaderSubText.displayName = "HeaderSubText";
