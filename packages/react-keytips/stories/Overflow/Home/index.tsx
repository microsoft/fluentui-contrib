import * as React from 'react';
import {
  mergeClasses,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
import {
  DeleteRegular,
  ArchiveRegular,
  DocumentAddRegular,
  ShieldKeyholeRegular,
  PinRegular,
  FlagRegular,
  PeopleRegular,
  FlashRegular,
  SettingsRegular,
  MailUnreadRegular,
} from '@fluentui/react-icons';
import { EmailMenu } from './EmailMenuButton';
import { homeKeytips as keytipsMap } from '../keytipsMap';
import { OverflowItemCustom } from '../OverflowItemCustom';
import { useStyles } from '../useStyles';
import { OverflowMenu } from '../OverflowMenu';

const menuItems = [
  {
    id: '2',
    disabled: false,
    name: 'Delete',
    keytipProps: keytipsMap.delete,
    icon: <DeleteRegular />,
  },
  {
    id: '3',
    name: 'Archive',
    disabled: false,
    keytipProps: keytipsMap.archive,
    icon: <ArchiveRegular />,
  },
  {
    id: '4',
    name: 'Add',
    disabled: false,
    keytipProps: keytipsMap.add,
    icon: <DocumentAddRegular />,
  },
  {
    id: '5',
    disabled: false,
    name: 'Report',
    keytipProps: keytipsMap.report,
    icon: <ShieldKeyholeRegular />,
  },
  {
    id: '6',
    name: 'Flag / Unflag',
    icon: <FlagRegular />,
    keytipProps: keytipsMap.flag,
    disabled: false,
  },
  {
    id: '7',
    icon: <PinRegular />,
    name: 'Pin / Unpin',
    keytipProps: keytipsMap.pin,
    disabled: false,
  },
  {
    id: '8',
    name: 'Group',
    icon: <PeopleRegular />,
    keytipProps: keytipsMap.groups,
    disabled: false,
  },
  {
    id: '9',
    name: 'Quick steps',
    icon: <FlashRegular />,
    keytipProps: keytipsMap.quickSteps,
    menuItems: [
      {
        id: '9-sub-menu-1',
        name: 'Manage quick steps',
        icon: <SettingsRegular />,
        keytipProps: keytipsMap.quickStepsMenuItem,
      },
    ],
    disabled: false,
  },
  {
    id: '10',
    name: 'Read / Unread',
    icon: <MailUnreadRegular />,
    keytipProps: keytipsMap.read,
    disabled: false,
  },
];

export default function Home() {
  const classes = useStyles();

  return (
    <Overflow minimumVisible={1}>
      <div className={mergeClasses(classes.container, classes.resizable)}>
        <OverflowItem id="1">
          <EmailMenu />
        </OverflowItem>
        {menuItems.map(({ id, ...props }) => (
          <OverflowItem key={id} id={id}>
            <OverflowItemCustom id={id} {...props} renderName={false} />
          </OverflowItem>
        ))}
        <OverflowMenu
          overflowMenuItems={menuItems}
          overflowKeytipProps={keytipsMap.overflowButton}
          overflowSequence={['h', '00']}
        />
      </div>
    </Overflow>
  );
}
