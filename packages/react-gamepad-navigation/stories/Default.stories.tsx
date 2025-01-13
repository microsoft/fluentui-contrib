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
  Input,
  Label,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useId,
} from '@fluentui/react-components';
import { userGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';

const useStyles = makeStyles({
  container: {
    padding: '20px',
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
});

export const Default = () => {
  const styles = useStyles();
  const attributes = userGamepadNavigationGroup();
  const inputId = useId('input');
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(true);
  const [option3, setOption3] = React.useState(false);

  return (
    <div className={styles.container} {...attributes}>
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
    </div>
  );
};
