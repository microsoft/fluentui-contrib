import * as React from 'react';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridInteraction,
  TreeGridRow,
  TreeGridRowOnOpenChangeData,
  useTreeGridRowContext,
} from '@fluentui-contrib/react-tree-grid';
import {
  Checkbox,
  CheckboxOnChangeData,
  Input,
  InputOnChangeData,
  Slot,
  Toolbar,
  ToolbarButton,
  Tooltip,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import {
  Delete24Regular,
  ArrowCircleUp24Regular,
  Add24Regular,
} from '@fluentui/react-icons';
import { EventHandler } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  row: {
    ...shorthands.padding('5px'),
    columnGap: '5px',
  },
  inputChecked: {
    textDecorationLine: 'line-through',
  },
});

export const TodoList = () => (
  <TreeGrid aria-label="Todo treegrid">
    <TodoItem defaultValue="Supermarket 🛒">
      <TodoItem defaultValue="Milk 🥛" />
      <TodoItem defaultValue="Eggs 🥚" />
      <TodoItem defaultValue="Bread 🍞" />
    </TodoItem>
    <TodoItem defaultValue="Workout 💪" />
    <TodoItem defaultValue="Walk with dog 🐶" defaultChecked />
  </TreeGrid>
);

type TodoItemProps = {
  defaultValue?: string;
  defaultChecked?: boolean;
  children?: Slot<typeof React.Fragment>;
};
const TodoItem = (props: TodoItemProps) => {
  const styles = useStyles();
  const [value, setValue] = React.useState(props.defaultValue ?? '');
  const [checked, setChecked] = React.useState(props.defaultChecked ?? false);
  const [open, setOpen] = React.useState(true);
  const handleCheckboxChange = (
    ev: React.ChangeEvent<HTMLElement>,
    data: CheckboxOnChangeData
  ) => setChecked(Boolean(data.checked));
  const handleInputChange = (
    ev: React.ChangeEvent<HTMLElement>,
    data: InputOnChangeData
  ) => setValue(data.value);
  const handleOpenChange: EventHandler<TreeGridRowOnOpenChangeData> = (
    ev,
    data
  ) => setOpen(data.open);
  const { level } = useTreeGridRowContext();
  return (
    <TreeGridRow
      open={open}
      onOpenChange={handleOpenChange}
      subtree={props.children}
      className={styles.row}
      style={{ paddingLeft: level * 15 }}
    >
      <TreeGridCell header>
        <Checkbox
          onChange={handleCheckboxChange}
          defaultChecked={checked}
          aria-label={checked ? 'Checked' : 'Unchecked'}
        />
      </TreeGridCell>
      <TreeGridCell>
        <TreeGridInteraction
          aria-roledescription="Interactive content"
          aria-description="Interact with Enter, then leave with Escape"
          aria-label="Type here"
        >
          <Input
            disabled={checked}
            appearance={checked ? 'underline' : 'outline'}
            value={value}
            input={{ className: checked ? styles.inputChecked : undefined }}
            onChange={handleInputChange}
          />
        </TreeGridInteraction>
      </TreeGridCell>
      <TreeGridCell>
        <TreeGridInteraction
          aria-roledescription="Interactive content"
          aria-description="Interact with Enter, then leave with Escape"
          aria-label="Extra Actions"
        >
          <Toolbar size="small" aria-label="Actions toolbar">
            {level === 0 && (
              <Tooltip content="Add step" relationship="label">
                <ToolbarButton icon={<Add24Regular />} />
              </Tooltip>
            )}
            <Tooltip
              content={level === 0 ? 'Delete task' : 'Delete step'}
              relationship="label"
            >
              <ToolbarButton icon={<Delete24Regular />} />
            </Tooltip>
            {level > 0 && (
              <Tooltip content="Promote to task" relationship="label">
                <ToolbarButton icon={<ArrowCircleUp24Regular />} />
              </Tooltip>
            )}
          </Toolbar>
        </TreeGridInteraction>
      </TreeGridCell>
    </TreeGridRow>
  );
};
