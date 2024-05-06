import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

// export const with a return statement

export const AvatarExample = () => {
  return (
    <>
      <Avatar name="Lydia Bauer" badge={{ status: 'available' }} />
      <Avatar name="Amanda Brady" badge={{ status: 'busy' }} />
      <Avatar name="Henry Brill" badge={{ status: 'out-of-office' }} />
      <Avatar name="Robin Counts" badge={{ status: 'away' }} />
      <Avatar name="Tim Deboer" badge={{ status: 'offline' }} />
      <Avatar name="Cameron Evans" badge={{ status: 'do-not-disturb' }} />
      <Avatar name="Wanda Howard" badge={{ status: 'blocked' }} />
      <Avatar
        name="Mona Kane"
        badge={{ status: 'available', outOfOffice: true }}
      />
      <Avatar
        name="Allan Munger"
        badge={{ status: 'busy', outOfOffice: true }}
      />
      <Avatar
        name="Erik Nason"
        badge={{ status: 'out-of-office', outOfOffice: true }}
      />
      <Avatar
        name="Daisy Phillips"
        badge={{ status: 'away', outOfOffice: true }}
      />
      <Avatar
        name="Kevin Sturgis"
        badge={{ status: 'offline', outOfOffice: true }}
      />
      <Avatar
        name="Elliot Woodward"
        badge={{ status: 'do-not-disturb', outOfOffice: true }}
      />
      <Avatar
        name="Wanda Howard"
        badge={{ status: 'blocked', outOfOffice: true }}
      />
    </>
  );
};
