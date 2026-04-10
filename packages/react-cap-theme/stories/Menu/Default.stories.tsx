import * as React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  CutRegular,
  ClipboardPasteRegular,
  EditRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button>Open menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Actions</MenuGroupHeader>
              <MenuItem icon={<CutRegular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
              <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Options</MenuGroupHeader>
              <MenuItemCheckbox name="options" value="bold">
                Bold
              </MenuItemCheckbox>
              <MenuItemCheckbox name="options" value="italic">
                Italic
              </MenuItemCheckbox>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Alignment</MenuGroupHeader>
              <MenuItemRadio name="align" value="left">
                Left
              </MenuItemRadio>
              <MenuItemRadio name="align" value="center">
                Center
              </MenuItemRadio>
              <MenuItemRadio name="align" value="right">
                Right
              </MenuItemRadio>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
      <MenuButton>Menu button</MenuButton>
    </div>
  );
};
