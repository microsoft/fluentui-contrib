import { root, makeInsertionPointSheet } from '@fluentui-contrib/react-shadow';
import { Button } from '@fluentui/react-components';
import * as React from 'react';

const insertionPointSheet = makeInsertionPointSheet();

const stylesFromOutsideReact = new CSSStyleSheet();
stylesFromOutsideReact.insertRule(
  `.my-style-from-outside-react {
    color: hotpink;
  }`
);

export const InsertionPoint = () => {
  const shadowRootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!shadowRootRef.current) {
      return;
    }

    const shadowRoot = shadowRootRef.current.shadowRoot;
    if (!shadowRoot) {
      return;
    }
    shadowRoot.adoptedStyleSheets = [
      insertionPointSheet,
      stylesFromOutsideReact,
    ];
  }, []);

  return (
    <div
      style={{
        border: '3px dotted orange',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <root.div ref={shadowRootRef}>
        <Button className="my-style-from-outside-react">Button</Button>
      </root.div>
    </div>
  );
};

InsertionPoint.parameters = {
  docs: {
    description: {
      story: `The insertion order of Fluent styles can be controlled with a sentinal "insertion point" stylesheet.
              This is useful for controlling specificity when using styles outside of Fluent.`,
    },
  },
};
