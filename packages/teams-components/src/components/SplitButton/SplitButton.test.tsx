import * as React from 'react';
import { render } from '@testing-library/react';
import { SplitButton } from './SplitButton';
import { CalendarRegular } from '@fluentui/react-icons';

describe('SplitButton', () => {
  it('should render', () => {
    render(<SplitButton>Test</SplitButton>);
  });

  it('should throw error if menuTitle is provided without main title', () => {
    expect(() =>
      render(<SplitButton menuTitle="Menu">Test</SplitButton>)
    ).toThrow(
      '@fluentui-contrib/teams-components::SplitButton with menuTitle present, title must also be provided'
    );
  });

  it('should throw error if no content or icon is provided', () => {
    expect(() => render(<SplitButton />)).toThrow(
      '@fluentui-contrib/teams-components::SplitButton must have at least one of children or icon'
    );
  });

  it('should throw error if icon button has no title provided', () => {
    expect(() => render(<SplitButton icon={<CalendarRegular />} />)).toThrow(
      '@fluentui-contrib/teams-components::Icon button must have a title or aria label'
    );
  });
});
