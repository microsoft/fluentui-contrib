import * as React from 'react';
import {
  CalendarMonthRegular,
  CheckmarkCircle20Filled,
  ClipboardPaste20Regular,
  ClipboardPasteRegular,
  CopyRegular,
  Cut20Regular,
  CutRegular,
  DismissCircle20Filled,
  Edit20Regular,
  ErrorCircle20Filled,
  TextAlignCenterRegular,
  TextAlignLeftRegular,
  TextAlignRightRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
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
  SpinButton,
  useId,
  Option,
  ComboboxProps,
  Dropdown,
  Select,
  Switch,
  Link,
  MenuItemLink,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
  Field,
  RadioGroup,
  Radio,
  Textarea,
  Slider,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  useFocusFinders,
  useFluent,
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
    padding: '10px',
    border: '4px solid transparent',
    ':focus-within': {
      border: '4px dashed #F4F4F4',
    },
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '12px',
    maxWidth: '400px',
    border: '4px solid transparent',
    ':focus-within': {
      border: '4px dashed #F4F4F4',
    },
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
  support: {
    fontSize: '12px',
    fontWeight: 400,
    display: 'inline-flex',
    width: '100px',
    float: 'right',
    '& svg': {
      marginLeft: '10px',
    },
  },
});

export const SingleElements = () => {
  const { gamepadNavAttributes } = useGamepadNavigationGroup();

  const { targetDocument } = useFluent();
  const styles = useStyles();
  const focusFuns = useFocusFinders();
  const dialogBtn = React.useRef<HTMLButtonElement>(null);
  const onClick = () => dialogBtn.current?.click();
  const onCloseDialog = () => {
    focusFuns
      .findFirstFocusable(targetDocument?.activeElement as HTMLElement)
      ?.focus();
  };
  const primaryActionButtonProps = {
    onClick,
  };
  const inputId = useId('input');
  const spinId = useId('spin-button');
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
  const sliderId = useId('slider-default');
  const selectId = useId('select-default');

  return (
    <div className={styles.container} {...gamepadNavAttributes}>
      <h1>Navigation with Single Input Elements</h1>
      <h3>
        Input
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.input}>
        <Label htmlFor={inputId}>Sample input</Label>
        <Input id={inputId} />
      </div>
      <h3>
        Textarea
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.input}>
        <Field label="Default Textarea">
          <Textarea />
        </Field>
      </div>
      <hr />
      <h3>
        Image Button
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Button
          aria-label="Bold"
          icon={<TextBoldRegular />}
          onClick={onClick}
        />
        <Button
          aria-label="Underline"
          icon={<TextUnderlineRegular />}
          onClick={onClick}
        />
        <Button
          aria-label="Italic"
          icon={<TextItalicRegular />}
          onClick={onClick}
        />
        <Button
          aria-label="Align Left"
          icon={<TextAlignLeftRegular />}
          onClick={onClick}
        />
        <Button
          aria-label="Align Center"
          icon={<TextAlignCenterRegular />}
          onClick={onClick}
        />
        <Button
          aria-label="Align Right"
          icon={<TextAlignRightRegular />}
          onClick={onClick}
        />
        <Button aria-label="Copy" icon={<CopyRegular />} onClick={onClick} />
        <Button aria-label="Cut" icon={<CutRegular />} onClick={onClick} />
        <Button
          aria-label="Paste"
          icon={<ClipboardPasteRegular />}
          onClick={onClick}
        />
      </div>
      <hr />
      <h3>
        Text Button
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Button onClick={onClick}>Default</Button>
        <Button appearance="primary" onClick={onClick}>
          Primary
        </Button>
        <Button appearance="outline" onClick={onClick}>
          Outline
        </Button>
        <Button appearance="subtle" onClick={onClick}>
          Subtle
        </Button>
        <Button appearance="transparent" onClick={onClick}>
          Transparent
        </Button>
      </div>
      <hr />
      <h3>
        Menu Button
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton icon={<CalendarMonthRegular />}>Default</MenuButton>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
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
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
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
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
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
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
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
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <hr />
      <h3>
        Split Button
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
              >
                Default
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                appearance="primary"
              >
                Primary
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                appearance="outline"
              >
                Outline
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                appearance="subtle"
              >
                Subtle
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                appearance="transparent"
              >
                Transparent
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onClick}>Item a</MenuItem>
              <MenuItem onClick={onClick}>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <hr />
      <h3>
        Slider
        <span className={styles.support}>
          Support:
          <DismissCircle20Filled color="#c50f1f" />
        </span>
      </h3>
      <div className={styles.row}>
        <div>
          <Label htmlFor={sliderId}>Basic Example</Label>
          <Slider defaultValue={20} id={sliderId} />
        </div>
        <div>
          <Label htmlFor={sliderId}>Default Example</Label>
          <Slider defaultValue={10} id={sliderId} />
        </div>
        <div>
          <Label htmlFor={sliderId}>Basic Example</Label>
          <Slider defaultValue={30} id={sliderId} />
        </div>
      </div>
      <hr />
      <h3>
        Spin Button
        <span className={styles.support}>
          Support:
          <DismissCircle20Filled color="#c50f1f" />
        </span>
      </h3>
      <div className={styles.row}>
        <div>
          <Label htmlFor={spinId}>Basic SpinButton</Label>
          <SpinButton defaultValue={10} min={0} max={20} id={spinId} />
        </div>
        <div>
          <Label htmlFor={spinId}>Default SpinButton</Label>
          <SpinButton defaultValue={20} min={20} max={30} id={spinId} />
        </div>
        <div>
          <Label htmlFor={spinId}>Default SpinButton</Label>
          <SpinButton defaultValue={38} min={30} max={40} id={spinId} />
        </div>
      </div>
      <hr />
      <h3>
        Checkbox
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
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
      <hr />
      <h3>
        Combobox
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
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
      <hr />
      <h3>
        Dropdown
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
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
      <hr />
      <h3>
        Link
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Link href="https://www.bing.com">This is a link</Link>
        <Link href="https://www.bing.com">Another link</Link>
        <Link href="https://www.bing.com">One last link</Link>
      </div>
      <hr />
      <h3>
        Menu
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button>Menu Item Link </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemLink href="https://www.microsoft.com" target="_blank">
                Home
              </MenuItemLink>
              <MenuItemLink href="https://www.microsoft.com">
                Online shop
              </MenuItemLink>
              <MenuItemLink href="https://www.microsoft.com">
                Contact us
              </MenuItemLink>
              <MenuItemLink href="https://www.microsoft.com">
                About
              </MenuItemLink>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button>Menu with Icons</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<Cut20Regular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
              <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button>Toggle menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuGroupHeader>Section header</MenuGroupHeader>
                <MenuItem icon={<Cut20Regular />}>Cut</MenuItem>
                <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
                <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuGroupHeader>Section header</MenuGroupHeader>
                <MenuItem icon={<Cut20Regular />}>Cut</MenuItem>
                <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
                <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <hr />
      <h3>
        Radio Group
        <span className={styles.support}>
          Support:
          <ErrorCircle20Filled color="#fce100" />
        </span>
      </h3>
      <div className={styles.row}>
        <Field label="Favorite Fruit">
          <RadioGroup layout="horizontal">
            <Radio value="apple" label="Apple" />
            <Radio value="pear" label="Pear" />
            <Radio value="banana" label="Banana" />
            <Radio value="orange" label="Orange" />
          </RadioGroup>
        </Field>
      </div>
      <hr />
      <h3>
        Select
        <span className={styles.support}>
          Support:
          <ErrorCircle20Filled color="#fce100" />
        </span>
      </h3>
      <div className={styles.row}>
        <div>
          <label htmlFor={selectId}>Color</label>
          <Select id={selectId}>
            <option>Red</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Orange</option>
          </Select>
        </div>
        <div>
          <label htmlFor={selectId}>Number</label>
          <Select id={selectId}>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
            <option>Four</option>
            <option>Five</option>
          </Select>
        </div>
      </div>
      <hr />
      <h3>
        Switch
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <Switch label="A" />
        <Switch label="B" defaultChecked />
        <Switch label="C" />
        <Switch label="D" />
        <Switch label="E" />
      </div>
      <div>
        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button ref={dialogBtn}>Open dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Click event</DialogTitle>
              <DialogContent>
                Element was triggered by click event.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary" onClick={onCloseDialog}>
                    Close
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
};
