import * as React from 'react';
import {
  FluentProvider,
  teamsLightTheme,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import { Popover } from './Popover';
import { PopoverTrigger } from '../PopoverTrigger';
import { PopoverSurface } from '../PopoverSurface';
import type { PopoverProps } from './Popover.types';

export const UncontrolledExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const ControlledExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Popover open={open} onOpenChange={(e, data) => setOpen(data.open)}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>
    </FluentProvider>
  );
};

export const OpenOnHoverExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover openOnHover>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

const CustomTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, ref) => {
  return (
    <button {...props} ref={ref}>
      Custom Trigger
    </button>
  );
});

export const CustomTriggerExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover>
      <PopoverTrigger>
        <CustomTrigger />
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const ContextPopoverExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover openOnContext>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const CloseOnScrollExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover closeOnScroll>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

const PopoverL1 = () => {
  const id = 'first';
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>First nested trigger</button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <button>First nested button</button>
        <PopoverL2 />
        <PopoverL2 />
      </PopoverSurface>
    </Popover>
  );
};

const PopoverL2 = () => {
  const id = 'second';
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Second nested trigger</button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <button>Second nested button</button>
      </PopoverSurface>
    </Popover>
  );
};

export const NestedExample = () => {
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Popover trapFocus>
        <PopoverTrigger>
          <button>Root trigger</button>
        </PopoverTrigger>

        <PopoverSurface>
          <button>Root button</button>
          <PopoverL1 />
        </PopoverSurface>
      </Popover>
    </FluentProvider>
  );
};

export const UpdatingContentExample = () => {
  const [visible, setVisible] = React.useState(false);

  const changeContent = () => setVisible(true);
  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    if (data.open === false) {
      setVisible(false);
    }
  };

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Popover trigger</button>
        </PopoverTrigger>

        <PopoverSurface>
          {visible ? (
            <div>The second panel</div>
          ) : (
            <div>
              <button onClick={changeContent}>Action</button>
            </div>
          )}
        </PopoverSurface>
      </Popover>
    </FluentProvider>
  );
};

export const InlineExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <div>
      <Popover inline>
        <PopoverTrigger>
          <button>Popover trigger</button>
        </PopoverTrigger>

        <PopoverSurface>This is a Popover</PopoverSurface>
      </Popover>
    </div>
    <div>Outside content</div>
  </FluentProvider>
);

export const LegacyTrapFocusExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <button>One</button>
        <button>Two</button>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const LegacyTrapFocusDisabledExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover
       
      legacyTrapFocus={false}
      trapFocus
    >
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <button>One</button>
        <button>Two</button>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const InertTrapFocusExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover inertTrapFocus trapFocus>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <button>One</button>
        <button>Two</button>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const TrapFocusWithTabIndexExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface tabIndex={-1} id="popover-surface">
        <button>One</button>
        <button>Two</button>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

const iframeContent = `<div id="iframecontent">
  <button>Hello World!</button>
</div>`;

const ExampleFrame = () => {
  return <iframe title="frame" srcDoc={iframeContent} />;
};

export const ExternalIframeExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <ExampleFrame />
    <div />
    <Popover>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const InternalIframeExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleFrame />
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const NestedInternalIframeExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover>
      <PopoverTrigger>
        <button>First</button>
      </PopoverTrigger>

      <PopoverSurface>
        <Popover>
          <PopoverTrigger>
            <button>Second</button>
          </PopoverTrigger>
          <PopoverSurface>
            <ExampleFrame />
          </PopoverSurface>
        </Popover>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const RestoreFocusExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover>
      <PopoverTrigger>
        <button id="trigger">trigger</button>
      </PopoverTrigger>
      <PopoverSurface>
        <button id="button">button</button>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);

export const PopoverWithMenuExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>
      <PopoverSurface>
        <Menu>
          <MenuTrigger>
            <button id="menu-trigger">Menu trigger</button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem id="first-item">Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </PopoverSurface>
    </Popover>
  </FluentProvider>
);
