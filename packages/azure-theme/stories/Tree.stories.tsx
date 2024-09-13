import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const TreeExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Tree aria-label="Default">
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 2</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 1, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Tree aria-label="Default">
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 2</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 1, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </FluentProvider>
  </div>
);
