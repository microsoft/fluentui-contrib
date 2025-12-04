import * as React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerProps,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { CAPThemeExamples } from '../StorybookUtils';

const drawerBodyText = [
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus nam aut amet similique, iure vel voluptates cum cumque repellendus perferendis maiores officia unde in?',
  'Autem neque sequi maiores eum omnis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis ipsam explicabo tempora ipsum saepe nam.',
  'Eum aliquid aperiam, laborum labore excepturi nisi odio deserunt facilis error. Mollitia dolor quidem a.',
].join(' ');

const DrawerContent = ({
  onClose,
}: {
  onClose: () => void;
}) => (
  <>
    <DrawerHeader>
      <DrawerHeaderTitle
        action={
          <Button
            appearance="subtle"
            aria-label="Close"
            icon={<DismissRegular />}
            onClick={onClose}
          />
        }
      >
        Title goes here
      </DrawerHeaderTitle>
    </DrawerHeader>
    <DrawerBody tabIndex={0} role="group" aria-label="Example scrolling content">
      {drawerBodyText}
    </DrawerBody>
    <DrawerFooter>
      <Button appearance="primary">Primary</Button>
      <Button>Secondary</Button>
    </DrawerFooter>
  </>
);

const PositionExample = ({
  size,
  position,
}: {
  size: DrawerProps['size'];
  position: DrawerProps['position'];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>

      <Drawer
        type="overlay"
        position={position}
        size={size}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerContent onClose={() => setIsOpen(false)} />
      </Drawer>
    </div>
  );
};

export const CAPDrawerStory = ({ size, position }: { size: DrawerProps['size'], position: DrawerProps['position'] }) => {
  return (
    <CAPThemeExamples
      examples={[
        {
          render: () => (
            <PositionExample size={size} position={position} />
          ),
        },
      ]}
    />
  );
};

CAPDrawerStory.argTypes = {
  size: {
    options: ['small', 'medium', 'large', 'full'],
    control: { type: 'radio' },
  },
  position: {
    options: ['start', 'end', 'bottom'],
    control: { type: 'radio' },
  },
};

CAPDrawerStory.args = {
  size: 'small',
  position: 'end',
};
