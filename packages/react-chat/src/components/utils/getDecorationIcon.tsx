import * as React from 'react';
import {
  AlertUrgentFilled,
  ImportantFilled,
  MentionFilled,
  PeopleFilled,
} from '@fluentui/react-icons';

export const getDecorationIcon = (
  decoration?: 'important' | 'urgent' | 'mention' | 'mentionEveryone'
) => {
  switch (decoration) {
    case 'important':
      return <ImportantFilled />;
    case 'urgent':
      return <AlertUrgentFilled />;
    case 'mention':
      return <MentionFilled />;
    case 'mentionEveryone':
      return <PeopleFilled />;
    default:
      return null;
  }
};
