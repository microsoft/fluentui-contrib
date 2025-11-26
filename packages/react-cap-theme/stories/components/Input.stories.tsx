import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { CAPThemeExamplesTable } from '../utils.stories';

export const CAPInputStory = () => {
  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Default',
          render() {
            return <Input placeholder="Placeholder text" />;
          },
        },
      ]}
    />
  );
};
