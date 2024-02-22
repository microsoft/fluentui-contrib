import { createRoot } from '@fluentui-contrib/react-shadow';
import { Button } from '@fluentui/react-components';
import * as React from 'react';

const insertionPoint = new CSSStyleSheet();

const stylesFromOutsideReact = new CSSStyleSheet();
stylesFromOutsideReact.insertRule(
  `.my-style-from-outside-react {
    color: hotpink;
  }`
);

// Griffel styles are inserted _after_ `insertionPoint`
const externalStyleSheets = [insertionPoint, stylesFromOutsideReact];
const root = createRoot({ insertionPoint });

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
