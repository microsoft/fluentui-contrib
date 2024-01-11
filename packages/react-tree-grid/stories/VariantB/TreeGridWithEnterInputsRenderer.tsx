import * as React from 'react';
import {
  getNearestGridCellAncestorOrSelf,
  getNearestRowAncestor,
  getFirstCellChild,
  focusNextOrPrevRow,
} from './TreeGridUtils';
import { useAdamTableInteractive2Navigation } from './useAdamTableInteractive2Navigation';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
} from '@fluentui-contrib/react-tree-grid';
import { Button, Field, Input } from '@fluentui/react-components';

export type RecentCategory = {
  id: string;
  title: string;
  expanded: boolean;
  columns: string[];
};

export type RecentMeetings = Record<
  string,
  {
    id: string;
    title: string;
    titleWithTime: string;
    properties?: MeetingProperty[];
    tasksCount?: number;
    revealed: boolean;
  }[]
>;

export type MeetingProperty =
  | 'includingContent'
  | 'transcript'
  | 'recorded'
  | 'mentionsOfYou'
  | 'missed';

interface TreeGridWithEnterInputsRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const TreeGridWithEnterInputsRenderer: React.FC<
  TreeGridWithEnterInputsRendererProps
> = ({ recentCategories, recentMeetings }) => {
  const { targetDocument } = useFluent_unstable();
  const [recentCategoriesState, setRecentCategoryState] =
    React.useState(recentCategories);

  const { tableTabsterAttribute, tableRowTabsterAttribute, onTableKeyDown } =
    useAdamTableInteractive2Navigation();
  const focusableGroupAttribute = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  const getCategoryById = React.useCallback(
    (id: string) => {
      return recentCategoriesState.find((category) => {
        return id === category.id;
      });
    },
    [recentCategoriesState]
  );

  const changeRecentCategoryExpandedState = React.useCallback(
    (category: RecentCategory | undefined, expanded: boolean) => {
      if (category) {
        category.expanded = expanded;
      }
      setRecentCategoryState([...recentCategoriesState]);
    },
    [recentCategoriesState]
  );

  const handleRowClick = React.useCallback(
    (event: React.MouseEvent) => {
      const currentTarget = event.currentTarget as HTMLElement;
      const selectedRowId = currentTarget.id;
      const category = getCategoryById(selectedRowId);
      changeRecentCategoryExpandedState(category, !category?.expanded);
    },
    [getCategoryById, changeRecentCategoryExpandedState]
  );

  const handleTreeGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      let callTabsterKeyboardHandler = true;
      const isModifierDown =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (!isModifierDown) {
        const target = event.target as HTMLElement;
        const gridCell = getNearestGridCellAncestorOrSelf(target);
        if (gridCell) {
          const row = getNearestRowAncestor(gridCell);
          const isFirstCellChild = gridCell === getFirstCellChild(row);
          if (event.key === 'ArrowLeft' && isFirstCellChild) {
            row.focus();
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            callTabsterKeyboardHandler = false;
            if (
              (target.tagName !== 'INPUT' ||
                target.getAttribute('type') !== 'text') &&
              target.role !== 'textbox'
            ) {
              focusNextOrPrevRow(row, event);
            }
          }
        } else if (target.role === 'row') {
          const selectedRowId = target.id;
          const category = getCategoryById(selectedRowId);
          const level = target.getAttribute('aria-level');
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            focusNextOrPrevRow(target, event);
          } else if (
            event.key === 'ArrowRight' &&
            level === '1' &&
            category &&
            !category.expanded
          ) {
            changeRecentCategoryExpandedState(category, true);
            callTabsterKeyboardHandler = false;
          } else if (event.key === 'ArrowLeft' && level === '1') {
            changeRecentCategoryExpandedState(category, false);
          } else if (
            (event.key === 'Enter' || event.key === ' ') &&
            level === '1'
          ) {
            changeRecentCategoryExpandedState(category, !category?.expanded);
          } else if (event.key === 'ArrowLeft' && level === '2') {
            const categoryToFocus = recentCategories.find((testedCategory) => {
              return !!recentMeetings[testedCategory.id].find((meeting) => {
                return meeting.id === selectedRowId;
              });
            }) as RecentCategory;
            const categoryRowToFocus = targetDocument?.getElementById(
              categoryToFocus.id
            ) as HTMLElement;
            categoryRowToFocus.focus();
          }
        }
        if (callTabsterKeyboardHandler) {
          onTableKeyDown(event);
        }
      }
    },
    [
      changeRecentCategoryExpandedState,
      getCategoryById,
      recentCategories,
      recentMeetings,
      onTableKeyDown,
      targetDocument,
    ]
  );

  return (
    <TreeGrid
      role="treegrid"
      aria-label="All meetings"
      aria-describedby="lastMeetings-hint"
      onKeyDown={handleTreeGridKeyDown}
      {...tableTabsterAttribute}
    >
      {recentCategories.map((category, index) => (
        <React.Fragment key={index}>
          <TreeGridRow
            role="row"
            id={category.id}
            tabIndex={0}
            onClick={handleRowClick}
            aria-level={1}
            aria-expanded={category.expanded}
            {...tableRowTabsterAttribute}
          >
            <TreeGridCell role="rowheader">{category.title}</TreeGridCell>
            <TreeGridCell
              role="gridcell"
              aria-colspan={category.columns.length + 3}
            >
              <Button>Header action</Button>
            </TreeGridCell>
          </TreeGridRow>
          {category.expanded &&
            recentMeetings[category.id].map((meeting) => (
              <TreeGridRow
                key={meeting.id}
                role="row"
                id={meeting.id}
                tabIndex={0}
                aria-level={2}
                {...tableRowTabsterAttribute}
              >
                <TreeGridCell role="rowheader">
                  {meeting.titleWithTime}
                </TreeGridCell>
                <TreeGridCell role="gridcell">
                  <Button>Chat with participants</Button>
                </TreeGridCell>
                <TreeGridCell
                  role="gridcell"
                  tabIndex={0}
                  {...focusableGroupAttribute}
                >
                  <Field label="Type here">
                    <Input />
                  </Field>
                </TreeGridCell>
                <TreeGridCell role="gridcell">
                  <Button>View recap</Button>
                  <Button>Another</Button>
                </TreeGridCell>
                {category.columns.includes('includingContent') && (
                  <TreeGridCell role="gridcell">
                    {meeting.properties?.includes('includingContent') && (
                      <Button>Agenda and notes</Button>
                    )}
                  </TreeGridCell>
                )}
                {category.columns.includes('tasks') && (
                  <TreeGridCell role="gridcell">
                    {meeting.tasksCount && (
                      <Button>{`${meeting.tasksCount} tasks`}</Button>
                    )}
                  </TreeGridCell>
                )}
                {category.columns.includes('transcript') && (
                  <TreeGridCell role="gridcell">
                    {meeting.properties?.includes('transcript') && (
                      <Button>Transcript</Button>
                    )}
                  </TreeGridCell>
                )}
              </TreeGridRow>
            ))}
        </React.Fragment>
      ))}
    </TreeGrid>
  );
};
