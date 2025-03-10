import {
  mergeClasses,
  useArrowNavigationGroup,
} from '@fluentui/react-components';
import * as React from 'react';
import { useStyles } from './Toolbar.styles';
import { StrictCssClass } from '../../strictStyles';
import {
  ToolbarItemRegistrationProvider,
  useInitItemRegistration,
} from './itemRegistration';

export interface ToolbarProps {
  children: React.ReactNode;
  className?: StrictCssClass;
}

export const toolbarClassNames = {
  root: 'tco-Toolbar',
};

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => {
    const { children, className } = props;
    const styles = useStyles();
    const registerItem = useInitItemRegistration();
    const contextValue = React.useMemo(
      () => ({ registerItem }),
      [registerItem]
    );

    return (
      <ToolbarItemRegistrationProvider value={contextValue}>
        <div
          role="toolbar"
          className={mergeClasses(
            toolbarClassNames.root,
            styles.root,
            className?.toString()
          )}
          ref={ref}
          {...useArrowNavigationGroup({ axis: 'both', circular: true })}
        >
          {children}
        </div>
      </ToolbarItemRegistrationProvider>
    );
  }
);

// TODO implement DOM validation API
// const isAllowedToolbarItem = (el: HTMLElement) => {
//   return (
//     el.classList.contains(toolbarButtonClassNames.root) ||
//     el.classList.contains(toolbarDividerClassNames.root) ||
//     el.classList.contains(toolbarMenuButtonClassNames.root) ||
//     el.classList.contains(toolbarToggleButtonClassNames.root)
//   );
// };
//
// const isPortalSpan = (el: HTMLElement) => {
//   return el.tagName === 'SPAN' && el.hasAttribute('hidden');
// };
//
// const isTabsterDummy = (el: HTMLElement) => {
//   return el.hasAttribute('data-tabster-dummy');
// };
//
// const validateToolbarItems = (root: HTMLElement) => {
//   const children = root.children;
//   for (const child of children) {
//     // TODO is this even possible?
//     if (!isHTMLElement(child)) {
//       continue;
//     }
//
//     if (
//       !isAllowedToolbarItem(child) &&
//       !isPortalSpan(child) &&
//       !isTabsterDummy(child)
//     ) {
//       throw new Error(
//         '@fluentui-contrib/teams-components::Toolbar::Use Toolbar components from @fluentui-contrib/teams-components package only'
//       );
//     }
//   }
// };
