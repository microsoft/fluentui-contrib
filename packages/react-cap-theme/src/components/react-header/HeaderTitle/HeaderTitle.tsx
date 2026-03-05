import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { HeaderTitleProps } from "./HeaderTitle.types";
import { renderHeaderTitle } from "./renderHeaderTitle";
import { useHeaderTitle } from "./useHeaderTitle";
import { useHeaderTitleStyles } from "./useHeaderTitleStyles.styles";

/**
 * A HeaderTitle displays the main title text with size-based typography styling for header components.
 *
 * @example
 * ```tsx
 * import { Header, HeaderTitle } from '@fluentui-contrib/react-cap-theme/react-header';
 *
 * <Header>
 *   <HeaderTitle>My Application</HeaderTitle>
 * </Header>
 * ```
 *
 * @alpha
 */
export const HeaderTitle: ForwardRefComponent<HeaderTitleProps> =
	React.forwardRef((props, ref) => {
		const state = useHeaderTitle(props, ref);
		const styledState = useHeaderTitleStyles(state);
		return renderHeaderTitle(styledState);
	});

HeaderTitle.displayName = "HeaderTitle";
