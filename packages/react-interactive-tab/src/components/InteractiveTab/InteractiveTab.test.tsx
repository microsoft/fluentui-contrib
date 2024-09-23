import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TabListProvider } from '@fluentui/react-components';
import type { TabListContextValue } from '@fluentui/react-components';
import { InteractiveTab } from './InteractiveTab';

describe('InteractiveTab', () => {
  const defaultContext: TabListContextValue = {
    appearance: 'transparent',
    disabled: false,
    size: 'medium',
    vertical: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onRegister: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onUnregister: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelect: () => {},
    getRegisteredTabs: () => {
      return {
        registeredTabs: {},
      };
    },
  };

  it('renders correctly', () => {
    const contextValues = {
      tabList: { ...defaultContext },
    };

    const result = render(
      <TabListProvider value={contextValues.tabList}>
        <InteractiveTab value="1" contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
      </TabListProvider>
    );

    expect(result.getByText('Before').tagName).toBe('SPAN');
    expect(result.getByRole('tab').tagName).toBe('BUTTON');
    expect(result.getByText('After').tagName).toBe('SPAN');
  });

  it('selected when clicked', () => {
    const onSelect = jest.fn();

    const contextValues = {
      tabList: { ...defaultContext, onSelect },
    };

    const result = render(
      <TabListProvider value={contextValues.tabList}>
        <InteractiveTab value="1" contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
      </TabListProvider>
    );

    fireEvent.click(result.getByRole('tab'));
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('renders correctly when disabled', () => {
    const contextValues = {
      tabList: { ...defaultContext },
    };

    const result = render(
      <TabListProvider value={contextValues.tabList}>
        <InteractiveTab
          value="1"
          disabled
          contentBefore="Before"
          contentAfter="After"
        >
          Default Tab
        </InteractiveTab>
      </TabListProvider>
    );

    expect(result.getByRole('tab').getAttribute('disabled')).toBe('');
  });
});
