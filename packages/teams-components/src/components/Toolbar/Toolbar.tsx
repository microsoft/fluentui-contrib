import {
  tokens,
  useMergedRefs,
  mergeClasses,
  useArrowNavigationGroup,
} from '@fluentui/react-components';
import { isHTMLElement } from '@fluentui/react-utilities';
import * as React from 'react';
import { useStyles } from './Toolbar.styles';
import { HTMLElementWalker } from '../../elementWalker';
import { StrictCssClass } from '../../strictStyles';
import { toolbarButtonClassNames } from './ToolbarButton';
import { toolbarDividerClassNames } from './ToolbarDivider';
import { toolbarToggleButtonClassNames } from './ToolbarToggleButton';
import { toolbarMenuButtonClassNames } from './ToolbarMenuButton';

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
    const enforceSpacingRef = useEnforceItemSpacing();

    return (
      <div
        role="toolbar"
        className={mergeClasses(
          toolbarClassNames.root,
          styles.root,
          className?.toString()
        )}
        ref={useMergedRefs(ref, enforceSpacingRef)}
        {...useArrowNavigationGroup({ axis: 'both', circular: true })}
      >
        {children}
      </div>
    );
  }
);

const useEnforceItemSpacing = () => {
  const elRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!elRef.current?.ownerDocument.defaultView) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      validateToolbarItems(elRef.current);
    }

    const treeWalker = new HTMLElementWalker(elRef.current, (el) => {
      if (isAllowedToolbarItem(el) || el === treeWalker.root) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_REJECT;
    });

    reaclcToolbarSpacing(treeWalker);

    const mutationObserver =
      new elRef.current.ownerDocument.defaultView.MutationObserver(() => {
        if (!elRef.current) {
          return;
        }

        if (process.env.NODE_ENV !== 'production') {
          validateToolbarItems(elRef.current);
        }

        // TODO can optimize by only doing recalc of affected elements
        reaclcToolbarSpacing(treeWalker);
      });

    mutationObserver.observe(elRef.current, {
      childList: true,
    });

    return () => mutationObserver.disconnect();
  }, []);

  return elRef;
};

const reaclcToolbarSpacing = (treeWalker: HTMLElementWalker) => {
  treeWalker.currentElement = treeWalker.root;
  let current = treeWalker.firstChild();
  while (current) {
    recalcToolbarItemSpacing(current, treeWalker);

    treeWalker.currentElement = current;
    current = treeWalker.nextElement();
  }
};

const isAllowedToolbarItem = (el: HTMLElement) => {
  return (
    el.classList.contains(toolbarButtonClassNames.root) ||
    el.classList.contains(toolbarDividerClassNames.root) ||
    el.classList.contains(toolbarMenuButtonClassNames.root) ||
    el.classList.contains(toolbarToggleButtonClassNames.root)
  );
};

const isPortalSpan = (el: HTMLElement) => {
  return el.tagName === 'SPAN' && el.hasAttribute('hidden');
};

const isTabsterDummy = (el: HTMLElement) => {
  return el.hasAttribute('data-tabster-dummy');
};

const validateToolbarItems = (root: HTMLElement) => {
  const children = root.children;
  for (const child of children) {
    // TODO is this even possible?
    if (!isHTMLElement(child)) {
      continue;
    }

    if (
      !isAllowedToolbarItem(child) &&
      !isPortalSpan(child) &&
      !isTabsterDummy(child)
    ) {
      throw new Error(
        '@fluentui-contrib/teams-components::Toolbar::Use Toolbar components from @fluentui-contrib/teams-components package only'
      );
    }
  }
};

const recalcToolbarItemSpacing = (
  el: HTMLElement,
  treeWalker: HTMLElementWalker
) => {
  treeWalker.currentElement = treeWalker.root;
  if (el === treeWalker.firstChild() || !isAllowedToolbarItem(el)) {
    return;
  }

  if (el.classList.contains(toolbarDividerClassNames.root)) {
    el.style.marginInlineStart = tokens.spacingHorizontalS;
    return;
  }

  treeWalker.currentElement = el;
  const prev = treeWalker.previousElement();
  if (prev && prev.dataset.appearance !== 'transparent') {
    el.style.marginInlineStart = tokens.spacingHorizontalS;
    return;
  }

  if (prev && el.dataset.appearance !== 'transparent') {
    prev.style.marginInlineStart = tokens.spacingHorizontalS;
    return;
  }
};
