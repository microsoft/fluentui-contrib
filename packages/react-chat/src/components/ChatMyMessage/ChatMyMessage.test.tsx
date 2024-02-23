import * as React from 'react';
import { render } from '@testing-library/react';
import { ChatMyMessage } from './ChatMyMessage';
import { useFocusableGroup } from '@fluentui/react-components';

describe('ChatMyMessage', () => {
  it('should render', () => {
    render(<ChatMyMessage />);
  });

  it('should apply tabster attribute', () => {
    const Example = () => (
      <>
        <ChatMyMessage data-testid="default" />
        <ChatMyMessage
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
