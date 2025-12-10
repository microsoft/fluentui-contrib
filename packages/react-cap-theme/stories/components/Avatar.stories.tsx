import * as React from 'react';
import {
  Avatar,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
} from '@fluentui/react-components';
import { CAPThemeExamplesTable } from '../StorybookUtils';

export const CAPAvatarStory = () => {
  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Default',
          render() {
            return <Avatar />;
          },
        },
        {
          title: 'Active',
          render() {
            return <Avatar active="active" />;
          },
        },
        {
          title: 'Avatar Group (Stack)',
          render() {
            return (
              <AvatarGroup layout="stack">
                <AvatarGroupItem name="John Michael" />
                <AvatarGroupItem name="John Michael" />
                <AvatarGroupItem name="John Michael" />
                <AvatarGroupPopover indicator="count">
                  <AvatarGroupItem name="John Michael" />
                  <AvatarGroupItem name="John Michael" />
                  <AvatarGroupItem name="John Michael" />
                  <AvatarGroupItem name="John Michael" />
                </AvatarGroupPopover>
              </AvatarGroup>
            );
          },
        },
      ]}
    />
  );
};
