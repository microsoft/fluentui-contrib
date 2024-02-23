import * as React from 'react';
import { render } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';
import { useFocusableGroup } from '@fluentui/react-components';

describe('ChatMessage', () => {
  it('should render', () => {
    render(<ChatMessage />);
  });

  it('should apply tabster attribute', () => {
    const Example = () => (
      <>
        <ChatMessage data-testid="default" />
        <ChatMessage
          data-testid="with-custom-tabster-attribute"
          {...useFocusableGroup({ ignoreDefaultKeydown: { Enter: true } })}
        />
      </>
    );
    const { getByTestId } = render(<Example />);
    expect(
      getByTestId('default').getAttribute('data-tabster')
    ).toMatchInlineSnapshot(`"{"groupper":{"tabbability":2},"focusable":{}}"`);
    expect(
      getByTestId('with-custom-tabster-attribute').getAttribute('data-tabster')
    ).toMatchInlineSnapshot(
      `"{"groupper":{},"focusable":{"ignoreKeydown":{"Enter":true}}}"`
    );
  });
});
