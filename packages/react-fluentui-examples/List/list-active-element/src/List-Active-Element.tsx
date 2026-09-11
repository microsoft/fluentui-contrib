import {
  Button,
  makeStyles,
  Persona,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import { Mic16Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-list-preview';

import * as React from 'react';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
  'Kristan Cable',
].map((name) => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  selectedInfo: {
    marginTop: '16px',
  },
  buttonWrapper: {
    alignSelf: 'center',
  },
  item: {
    cursor: 'pointer',
    padding: '2px 6px',
    justifyContent: 'space-between',
    border: '1px solid transparent',
  },
  itemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    borderRadius: '4px',
  },
});

export const ListActiveElement = () => {
  const classes = useStyles();

  const [activeItem, setActiveItem] = React.useState<string | number | null>(
    null
  );

  const onFocus = React.useCallback((event) => {
    // Ignore bubbled up events from the children
    if (event.target !== event.currentTarget) {
      return;
    }
    setActiveItem(event.target.dataset.value);
  }, []);

  const onAction = React.useCallback((_, { value }) => {
    setActiveItem(value);
  }, []);

  return (
    <div>
      <List navigationMode="composite">
        {items.map(({ name, avatar }) => (
          <ListItem
            key={name}
            value={name}
            className={mergeClasses(
              classes.item,
              activeItem === name && classes.itemActive
            )}
            onAction={onAction}
            data-value={name}
            aria-label={name}
            onFocus={onFocus}
          >
            <Persona
              name={name}
              role="gridcell"
              secondaryText="Available"
              presence={{ status: 'available' }}
              avatar={{
                image: {
                  src: avatar,
                },
              }}
            />
            <div role="gridcell" className={classes.buttonWrapper}>
              <Button
                aria-label={`Mute ${name}`}
                size="small"
                icon={<Mic16Regular />}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Muting ${name}`);
                }}
              />
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.selectedInfo}>
        Currently selected:{' '}
        <Text block weight="bold">
          {activeItem}
        </Text>
      </div>
    </div>
  );
};

export default ListActiveElement;
