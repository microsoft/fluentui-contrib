import * as React from 'react';
import {
  mergeClasses,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
import {
  SettingsRegular,
  PersonCallRegular,
  PeopleCallRegular,
  FlagRegular,
  HeadsetRegular,
} from '@fluentui/react-icons';
import { helpKeytips as keytipsMap } from '../keytipsMap';
import { OverflowItemCustom } from '../OverflowItemCustom';
import { useStyles } from '../useStyles';
import { OverflowMenu } from '../OverflowMenu';

const menuItems = [
  {
    id: '1',
    disabled: false,
    name: 'Help',
    keytipProps: keytipsMap.help,
    icon: <SettingsRegular />,
  },
  {
    id: '2',
    name: 'Tips',
    disabled: false,
    keytipProps: keytipsMap.tips,
    icon: <PersonCallRegular />,
  },
  {
    id: '3',
    name: 'Support',
    disabled: false,
    keytipProps: keytipsMap.support,
    icon: <HeadsetRegular />,
  },
  {
    id: '4',
    disabled: false,
    name: 'Feedback',
    keytipProps: keytipsMap.feedback,
    icon: <PeopleCallRegular />,
  },
  {
    id: '5',
    name: 'Rollout Overrides',
    icon: <FlagRegular />,
    keytipProps: keytipsMap.rollout,
    disabled: false,
  },
];

export default function Help() {
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
          overflowSequence={['e', '00']}
        />
      </div>
    </Overflow>
  );
}
