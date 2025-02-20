import { tokens, useFluent } from '@fluentui/react-components';
import * as React from 'react';
import {
  itemRegistrationVars,
  registerCustomProperties,
  useItemRegistrationStyles,
} from './itemRegistration.styles';

export interface ToolbarItemRegistrationContextValue {
  registerItem: (element: HTMLElement, metadata: ToolbarItemMetadata) => void;
}

export interface ToolbarItemMetadata {
  appearance?: 'transparent' | 'primary';
  type: 'button' | 'divider';
}

const ToolbarItemRegistrationContext =
  React.createContext<ToolbarItemRegistrationContextValue>({
    registerItem: () => {
      throw new Error('ToolbarItemRegistrationContext is not provided');
    },
  });

export const ToolbarItemRegistrationProvider =
  ToolbarItemRegistrationContext.Provider;

export const useInitItemRegistration = () => {
  const { targetDocument } = useFluent();
  const items = React.useRef<
    {
      element: HTMLElement;
      metadata: ToolbarItemMetadata;
    }[]
  >([]);

  const firstMount = React.useRef(true);

  const registerItem = React.useCallback(
    (element: HTMLElement, metadata: ToolbarItemMetadata) => {
      const insertionPoint = Math.max(
        items.current.findIndex(
          (item) =>
            item.element.compareDocumentPosition(element) &
            Node.DOCUMENT_POSITION_PRECEDING
        ),
        items.current.length
      );

      items.current.splice(insertionPoint, 0, { element, metadata });

      if (!firstMount) {
        // TODO debounce this
        recalcToolbarItemSpacing();
      }

      return () => {
        const index = items.current.findIndex(
          (item) => item.element === element
        );
        items.current.splice(index, 1);
      };
    },
    []
  );

  const recalcToolbarItemSpacing = React.useCallback(() => {
    for (let i = 0; i < items.current.length; i++) {
      if (i === 0) {
        continue;
      }

      // TODO test this logic
      const current = items.current[i];
      // TODO better API to apply styles
      if (current.metadata.type === 'divider') {
        current.element.style.setProperty(
          itemRegistrationVars.toolbarItemMarginInlineStart,
          tokens.spacingHorizontalS
        );
        continue;
      }

      if (current.metadata.appearance === 'transparent') {
        const prev = items.current[i - 1];
        if (prev.metadata.appearance !== 'transparent') {
          current.element.style.setProperty(
            itemRegistrationVars.toolbarItemMarginInlineStart,
            tokens.spacingHorizontalS
          );
        }
      } else {
        current.element.style.setProperty(
          itemRegistrationVars.toolbarItemMarginInlineStart,
          tokens.spacingHorizontalS
        );
      }
    }
  }, []);

  React.useLayoutEffect(() => {
    if (targetDocument?.defaultView) {
      registerCustomProperties(targetDocument.defaultView);
    }

    recalcToolbarItemSpacing();
    firstMount.current = false;
  }, [recalcToolbarItemSpacing, targetDocument]);

  return registerItem;
};

export const useItemRegistration = (metadata: ToolbarItemMetadata) => {
  const { registerItem } = React.useContext(ToolbarItemRegistrationContext);
  const styles = useItemRegistrationStyles();
  const ref = React.useCallback((el: HTMLElement) => {
    if (el) {
      registerItem(el, metadata);
    }
  }, []);

  return { ref, styles };
};
