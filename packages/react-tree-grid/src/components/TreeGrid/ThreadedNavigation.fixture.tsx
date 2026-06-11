import * as React from 'react';
import { TreeGrid } from './TreeGrid';
import { TreeGridCell } from '../TreeGridCell';
import { TreeGridInteraction } from '../TreeGridInteraction';
import { TreeGridRow } from '../TreeGridRow/TreeGridRow';
import { useTreeGridLevelNavigation } from '../../hooks/useTreeGridLevelNavigation';

const threadedSeeds = [
  { id: 'thread-401', messages: 2 },
  { id: 'thread-402', messages: 3 },
  { id: 'thread-403', messages: 2 },
  { id: 'thread-404', messages: 2 },
] as const;

const getThreadMessageId = (threadId: string, messageIndex: number): string =>
  `${threadId}--message-${messageIndex + 1}`;

const getThreadInputId = (threadId: string): string => `${threadId}-input`;

export const ThreadedNavigationFixture = (): React.ReactElement => {
  const levelNavigation = useTreeGridLevelNavigation();

  return (
    <TreeGrid
      aria-label="Threaded TreeGrid without virtualization"
      {...levelNavigation}
    >
      {threadedSeeds.map((thread) => (
        <TreeGridRow
          data-item-id={thread.id}
          defaultOpen
          key={thread.id}
          subtree={
            <>
              {Array.from({ length: thread.messages }, (_, index) => (
                <TreeGridRow
                  data-item-id={getThreadMessageId(thread.id, index)}
                  data-item-parent-id={thread.id}
                  data-rowtype="message"
                  key={getThreadMessageId(thread.id, index)}
                  level={2}
                >
                  <TreeGridCell header>{`Message ${index + 1}`}</TreeGridCell>
                  <TreeGridCell>Preview</TreeGridCell>
                </TreeGridRow>
              ))}
              <TreeGridRow
                data-item-id={getThreadInputId(thread.id)}
                data-item-parent-id={thread.id}
                data-rowtype="input"
                key={getThreadInputId(thread.id)}
                level={2}
              >
                <TreeGridCell header>
                  <TreeGridInteraction aria-label="Thread reply input">
                    <textarea placeholder="Reply to thread..." />
                  </TreeGridInteraction>
                </TreeGridCell>
              </TreeGridRow>
            </>
          }
        >
          <TreeGridCell header>{thread.id}</TreeGridCell>
          <TreeGridCell>{`messages ${thread.messages}`}</TreeGridCell>
        </TreeGridRow>
      ))}
    </TreeGrid>
  );
};
