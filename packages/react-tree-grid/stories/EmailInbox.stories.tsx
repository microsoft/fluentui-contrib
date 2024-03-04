import * as React from 'react';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowOnOpenChangeData,
  useTreeGridRowContext,
} from '@fluentui-contrib/react-tree-grid';
import {
  Body1,
  Link,
  Slot,
  useTableRowStyles_unstable,
  useTableRow_unstable,
  useTableCell_unstable,
  useTableHeader_unstable,
  useTableHeaderCell_unstable,
  mergeClasses,
  useTableCellStyles_unstable,
  useTableHeaderStyles_unstable,
  useTableHeaderCellStyles_unstable,
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItem,
  Avatar,
} from '@fluentui/react-components';
import {
  ChevronRightRegular,
  ChevronDownRegular,
  MoreHorizontal24Regular,
} from '@fluentui/react-icons';
import { EventHandler } from '@fluentui/react-utilities';

export const EmailInbox = () => {
  const tableRowStyle = useTableRowStyle();
  const tableCellStyle = useTableHeaderCellStyle();
  const tableHeaderStyle = useTableHeaderStyle();
  return (
    <TreeGrid aria-label="All e-mails">
      <div role="rowgroup" className={tableHeaderStyle}>
        <div role="row" className={tableRowStyle}>
          <div role="columnheader" className={tableCellStyle}>
            Subject
          </div>
          <div role="columnheader" className={tableCellStyle}>
            Summary
          </div>
          <div role="columnheader" className={tableCellStyle}>
            Sender
          </div>
          <div role="columnheader" className={tableCellStyle}>
            Actions
          </div>
        </div>
      </div>
      <Email
        subject={
          <>
            <Avatar aria-hidden color="colorful" name="Čestmír Ondřej" />{' '}
            Implementing treegrid pattern
          </>
        }
        summary="Here's attached the treegrid specs"
        email="condrej@email.com"
        replies={
          <>
            <Email
              subject={
                <>
                  <Avatar aria-hidden color="colorful" name="Maxim Tobiáš" />{' '}
                  Re: Implementing treegrid pattern
                </>
              }
              summary="Thanks Čestmír, I'll take a look"
              email="mtobias@email.com"
            />
            <Email
              subject={
                <>
                  <Avatar aria-hidden color="colorful" name="Kristina Ctibor" />{' '}
                  Re: Implementing treegrid pattern
                </>
              }
              summary="Great documentation!"
              email="kctibor@email.com"
            />
          </>
        }
      />
      <Email
        subject={
          <>
            <Avatar aria-hidden color="colorful" name="E+D HR" /> E+D HR
          </>
        }
        summary="Career Jams Registration is now open"
        email="edhr@microsoft.com"
      />
      <Email
        subject={
          <>
            <Avatar aria-hidden color="colorful" name="Kristina Ctibor" />{' '}
            Kristina Ctibor
          </>
        }
        summary="Record Fluent UI demos for FW demo session"
        email="kctibor@email.com"
      />
    </TreeGrid>
  );
};

type EmailProps = {
  subject: React.ReactNode;
  summary: React.ReactNode;
  email: string;
  replies?: Slot<typeof React.Fragment>;
};

const Email = (props: EmailProps) => {
  const { level } = useTreeGridRowContext();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: EventHandler<TreeGridRowOnOpenChangeData> = (
    ev,
    data
  ) => setOpen(data.open);
  const tableRowStyle = useTableRowStyle();
  const tableCellStyle = useTableCellStyle();
  return (
    <TreeGridRow
      open={open}
      onOpenChange={handleOpenChange}
      subtree={props.replies}
      className={tableRowStyle}
    >
      <TreeGridCell className={tableCellStyle} header>
        <span
          style={{
            paddingLeft: (level - 1) * 10,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {props.replies && (
            <>
              {open ? (
                <ChevronDownRegular aria-hidden />
              ) : (
                <ChevronRightRegular aria-hidden />
              )}
            </>
          )}
          {props.subject}
        </span>
      </TreeGridCell>
      <TreeGridCell className={tableCellStyle}>{props.summary}</TreeGridCell>
      <TreeGridCell className={tableCellStyle}>
        <Link href={`mailto:${props.email}`}>{props.email}</Link>
      </TreeGridCell>
      <TreeGridCell className={tableCellStyle}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              aria-label="More actions"
              icon={<MoreHorizontal24Regular />}
              appearance="subtle"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Reply</MenuItem>
              <MenuItem>Attachments</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </TreeGridCell>
    </TreeGridRow>
  );
};

const useTableHeaderStyle = () =>
  useTableHeaderStyles_unstable({
    ...useTableHeader_unstable({}, React.createRef()),
    noNativeElements: true,
  }).root.className;

const useTableHeaderCellStyle = () => {
  const { root, button } = useTableHeaderCellStyles_unstable({
    ...useTableHeaderCell_unstable({}, React.createRef()),
    noNativeElements: true,
  });
  return mergeClasses(root.className, button.className);
};

const useTableRowStyle = () =>
  useTableRowStyles_unstable({
    ...useTableRow_unstable({}, React.createRef()),
    noNativeElements: true,
  }).root.className;

const useTableCellStyle = () =>
  useTableCellStyles_unstable({
    ...useTableCell_unstable({}, React.createRef()),
    noNativeElements: true,
  }).root.className;
