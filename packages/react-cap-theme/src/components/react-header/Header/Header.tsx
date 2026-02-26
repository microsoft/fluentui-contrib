import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { HeaderProps } from "./Header.types";
import { useHeaderContextValues } from "./HeaderContext";
import { renderHeader } from "./renderHeader";
import { useHeader } from "./useHeader";
import { useHeaderStyles } from "./useHeaderStyles.styles";

/**
 * A Header provides a consistent top-level page structure with support for navigation,
 * titles, actions, and collapsible content.
 *
 * @example
 * ```tsx
 * import { Header, HeaderTitle, HeaderSubText } from '@fluentui-contrib/react-cap-theme/react-header';
 *
 * <Header>
 *   <HeaderTitle>Page Title</HeaderTitle>
 *   <HeaderSubText>Optional description or subtitle</HeaderSubText>
 * </Header>
 * ```
 *
 * @alpha
 */
export const Header: ForwardRefComponent<HeaderProps> = React.forwardRef(
	(props, ref) => {
		const state = useHeader(props, ref);
		const styledState = useHeaderStyles(state);
		const contextValues = useHeaderContextValues(styledState);
		return renderHeader(styledState, contextValues);
	},
);

Header.displayName = "Header";
