import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
  CalendarMonthRegular,
} from '@fluentui/react-icons';
import {
  Button,
  Checkbox,
  Combobox,
  Input,
  Label,
  makeStyles,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  useId,
  Option,
  ComboboxProps,
  Dropdown,
  Select,
  Switch,
} from '@fluentui/react-components';
import { useGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';

const useStyles = makeStyles({
  container: {
    margin: '20px',
    padding: '20px',
    border: '4px dashed #D3D3D3',
    display: 'flex',
    flexDirection: 'column',
    width: '660px',
    ':focus-within': {
      border: '4px dashed red',
    },
  },
  row: {
    columnGap: '15px',
    display: 'flex',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
  },
  combobox: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
  dropdown: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const gamepadNavigationAttributes = useGamepadNavigationGroup();
  const inputId = useId('input');
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(true);
  const [option3, setOption3] = React.useState(false);
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const selectedListId = `${comboId}-selection`;
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const labelledBy =
    selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;
  const dropdownId = useId('dropdown-default');
  const selectId = useId('select-default');

  return (
    <div className={styles.container} {...gamepadNavigationAttributes}>
      <div className={styles.input}>
        <Label htmlFor={inputId}>Sample input</Label>
        <Input id={inputId} />
      </div>
      <br />
      <div className={styles.row}>
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
      <br />
      <div className={styles.row}>
        <Button>Default</Button>
        <Button appearance="primary">Primary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
      </div>
      <br />
      <div className={styles.row}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton icon={<CalendarMonthRegular />}>Default</MenuButton>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="primary" icon={<CalendarMonthRegular />}>
              Primary
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="outline" icon={<CalendarMonthRegular />}>
              Outline
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="subtle" icon={<CalendarMonthRegular />}>
              Subtle
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="transparent"
              icon={<CalendarMonthRegular />}
            >
              Transparent
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <br />
      <div className={styles.row}>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton menuButton={triggerProps}>Default</SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton menuButton={triggerProps} appearance="primary">
                Primary
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton menuButton={triggerProps} appearance="outline">
                Outline
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton menuButton={triggerProps} appearance="subtle">
                Subtle
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton menuButton={triggerProps} appearance="transparent">
                Transparent
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <br />
      <div className={styles.row}>
        <Checkbox
          checked={
            option1 && option2 && option3
              ? true
              : !(option1 || option2 || option3)
              ? false
              : 'mixed'
          }
          onChange={(_ev, data) => {
            setOption1(!!data.checked);
            setOption2(!!data.checked);
            setOption3(!!data.checked);
          }}
          label="All options"
        />

        <Checkbox
          checked={option1}
          onChange={() => setOption1((checked) => !checked)}
          label="Option 1"
        />
        <Checkbox
          checked={option2}
          onChange={() => setOption2((checked) => !checked)}
          label="Option 2"
        />
        <Checkbox
          checked={option3}
          onChange={() => setOption3((checked) => !checked)}
          label="Option 3"
        />
      </div>
      <div className={styles.row}>
        <div className={styles.combobox}>
          <label id={comboId}>Best pet</label>
          <Combobox aria-labelledby={comboId} placeholder="Select an animal">
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Combobox>
        </div>
        <div className={styles.combobox}>
          <label id={comboId}>Best pets</label>
          <Combobox
            aria-labelledby={labelledBy}
            multiselect={true}
            placeholder="Select one or more animals"
            onOptionSelect={onSelect}
          >
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Combobox>
          {selectedOptions.length ? (
            <span id={selectedListId}>
              Chosen pets: {selectedOptions.join(', ')}
            </span>
          ) : null}
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <div className={styles.dropdown}>
          <label id={dropdownId}>Best pet</label>
          <Dropdown aria-labelledby={dropdownId} placeholder="Select an animal">
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Dropdown>
        </div>
        <div className={styles.dropdown}>
          <label id={comboId}>Best pet</label>
          <Dropdown
            aria-labelledby={comboId}
            multiselect={true}
            placeholder="Select an animal"
          >
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Dropdown>
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <label htmlFor={selectId}>Color</label>
        <Select id={selectId}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
          <option>Yellow</option>
          <option>Orange</option>
        </Select>
      </div>
      <br />
      <div className={styles.row}>
        <Switch label="A" />
        <Switch label="B" />
        <Switch label="C" />
        <Switch label="D" />
        <Switch label="E" />
      </div>
    </div>
  );
};
