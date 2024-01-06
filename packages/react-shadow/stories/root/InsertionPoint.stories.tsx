import { root, makeInsertionPointSheet } from '@fluentui-contrib/react-shadow';
import { Button } from '@fluentui/react-components';
import * as React from 'react';

// Create a sentinel stylesheet.
// All Griffel styles will be inserted _before_ this sheet.
// NOTE: this is just a normal stylesheet with extra metadata
// attached to it. You can add styles to it if you like. Styles
// are omitted here for better illustrate the feature.
const insertionPointSheet = makeInsertionPointSheet();

const stylesFromOutsideReact = new CSSStyleSheet();
stylesFromOutsideReact.insertRule(
  `.my-style-from-outside-react {
    color: hotpink;
  }`
);

const externalStyleSheets = [insertionPointSheet, stylesFromOutsideReact];

export const InsertionPoint = () => {
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
      <root.div styleSheets={externalStyleSheets}>
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
