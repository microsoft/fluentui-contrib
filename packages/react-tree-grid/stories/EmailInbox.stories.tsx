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
} from '@fluentui/react-components';
import {
  CaretRight16Filled,
  CaretDown16Filled,
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
        subject="Treegrids are awesome"
        summary="Want to learn how to use them?"
        email="aaron@thegoogle.rocks"
        replies={
          <>
            <Email
              subject="Re: Treegrids are awesome"
              summary="I agree with you, they are the shizzle"
              email="joe@blahblahblah.blahblah"
            />
            <Email
              subject="Re: Treegrids are awesome"
              summary="They are great for showing a lot of data, like a grid"
              email="billy@dangerous.fish"
              replies={
                <>
                  <Email
                    subject="Re: Treegrids are awesome"
                    summary="Cool, we've been needing an example and documentation"
                    email="doris@rufflazydogs.sleep"
                  />
                </>
              }
            />
            <Email
              subject="Re: Treegrids are awesome"
              summary="I hear the Fancytree library is going to align with this example!"
              email="someone@please-do-it.company"
              replies={
                <>
                  <Email
                    subject="Re: Treegrids are awesome"
                    summary="Sometimes they are more like trees, others are more like grids"
                    email="mari@beingpractical.com"
                    replies={
                      <>
                        <Email
                          subject="Re: Treegrids are awesome"
                          summary="Cool, when it's a tree, let's keep left/right to collapse/expand"
                          email="issie@imadeadcatsadly.wascute"
                        />
                        <Email
                          subject="Re: Treegrids are awesome"
                          summary="I see, sometimes right arrow moves by column"
                          email="kitten@kittenseason.future"
                        />
                      </>
                    }
                  />
                </>
              }
            />
          </>
        }
      />
    </TreeGrid>
  );
};

type EmailProps = {
  subject: string;
  summary: string;
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
        <span style={{ paddingLeft: level * 10 }}>
          {props.replies && (
            <>
              {open ? (
                <CaretDown16Filled aria-hidden />
              ) : (
                <CaretRight16Filled aria-hidden />
              )}
            </>
          )}
          <Body1>{props.subject}</Body1>
        </span>
      </TreeGridCell>
      <TreeGridCell className={tableCellStyle}>
        <Body1>{props.summary}</Body1>
      </TreeGridCell>
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
              <MenuItem>Reply </MenuItem>
              <MenuItem>Delete </MenuItem>
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
