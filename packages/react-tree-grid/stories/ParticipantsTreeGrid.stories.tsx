import * as React from 'react';
import { Button } from '@fluentui/react-components';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
} from '@fluentui-contrib/react-tree-grid';

import { participantsList } from './participantsList';

export const ParticipantsTreeGrid = () => {
  return (
    <TreeGrid aria-label="Participants">
      <TreeGridRow
        defaultOpen={true}
        subtree={
          <>
            {participantsList.people.map((name, index) => (
              <TreeGridRow key={index} aria-label={name}>
                <TreeGridCell>{name}</TreeGridCell>
                <TreeGridCell>
                  <Button aria-description={`Show profile card for ${name}`}>
                    Avatar for {name}
                  </Button>
                </TreeGridCell>
                <TreeGridCell>
                  <Button>Remove {name}</Button>
                </TreeGridCell>
              </TreeGridRow>
            ))}
          </>
        }
      >
        <TreeGridCell>People ({participantsList.people.length})</TreeGridCell>
      </TreeGridRow>
      <TreeGridRow
        defaultOpen={true}
        subtree={
          <>
            {participantsList.agentsAndBots.map((name, index) => (
              <TreeGridRow key={index} aria-label={name}>
                <TreeGridCell>{name}</TreeGridCell>
                <TreeGridCell>
                  <Button aria-description={`Show profile card for ${name}`}>
                    Avatar for {name}
                  </Button>
                </TreeGridCell>
                <TreeGridCell>
                  <Button>Remove {name}</Button>
                </TreeGridCell>
              </TreeGridRow>
            ))}
          </>
        }
      >
        <TreeGridCell>
          Agents and bots ({participantsList.agentsAndBots.length})
        </TreeGridCell>
      </TreeGridRow>
    </TreeGrid>
  );
};
