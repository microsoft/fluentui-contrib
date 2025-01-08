import * as React from 'react';
import {
  mergeClasses,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
import {
  SettingsRegular,
  MailRegular,
  ZoomInRegular,
  ArrowSyncRegular,
  LayoutCellFourRegular,
  FolderRegular,
  TextDensityRegular,
} from '@fluentui/react-icons';
import { viewKeytips as keytipsMap, onExecute } from '../keytipsMap';
import { OverflowItemCustom } from '../OverflowItemCustom';
import { useStyles } from '../useStyles';
import { OverflowMenu } from '../OverflowMenu';

const menuItems = [
  {
    id: '1',
    disabled: false,
    name: 'View settigns',
    keytipProps: keytipsMap.viewSettings,
    icon: <SettingsRegular />,
  },
  {
    id: '2',
    name: 'Messages',
    disabled: false,
    keytipProps: keytipsMap.messages,
    icon: <MailRegular />,
  },
  {
    id: '3',
    name: 'Zoom',
    disabled: false,
    keytipProps: keytipsMap.zoom,
    icon: <ZoomInRegular />,
  },
  {
    id: '4',
    disabled: false,
    name: 'Sync',
    keytipProps: keytipsMap.sync,
    icon: <ArrowSyncRegular />,
  },
  {
    id: '5',
    name: 'Layout',
    icon: <LayoutCellFourRegular />,
    keytipProps: keytipsMap.layout,
    menuItems: [
      {
        name: 'Ribbon',
        id: '5-menu-1',
        keytipProps: {
          content: 'RB',
          keySequences: keytipsMap.layout.keySequences.concat(['rb']),
          onExecute,
        },
      },
      {
        id: '5-menu-2',
        name: 'Reading pane',
        keytipProps: {
          content: 'RP',
          keySequences: keytipsMap.layout.keySequences.concat(['rp']),
          onExecute,
        },
      },
      {
        id: '5-menu-3',
        name: 'My day',
        keytipProps: {
          content: 'MD',
          keySequences: keytipsMap.layout.keySequences.concat(['MD']),
          onExecute,
        },
      },
    ],
    disabled: false,
  },
  {
    id: '6',
    icon: <FolderRegular />,
    name: 'Folder pane',
    keytipProps: keytipsMap.folderPane,
    disabled: false,
  },
  {
    id: '7',
    name: 'Density',
    icon: <TextDensityRegular />,
    keytipProps: keytipsMap.density,
    disabled: false,
  },
];

export default function View() {
  const classes = useStyles();

  return (
    <Overflow minimumVisible={1}>
      <div className={mergeClasses(classes.container, classes.resizable)}>
        {menuItems.map(({ id, ...props }) => (
          <OverflowItem key={id} id={id}>
            <OverflowItemCustom id={id} {...props} />
          </OverflowItem>
        ))}
        <OverflowMenu
          overflowMenuItems={menuItems}
          overflowKeytipProps={keytipsMap.overflowButton}
          overflowSequence={['v', '00']}
        />
      </div>
    </Overflow>
  );
}
