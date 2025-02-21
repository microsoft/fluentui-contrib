import * as React from 'react';
import {
  bundleIcon,
  CalendarMonthRegular,
  CheckmarkCircle20Filled,
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  ErrorCircle20Filled,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  makeStyles,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionHeader,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  PresenceBadgeStatus,
  TableColumnDefinition,
  createTableColumn,
  TableCellLayout,
  DataGridRow,
  DataGridCell,
  Avatar,
  SwatchPicker,
  ColorSwatch,
  SwatchPickerOnSelectEventHandler,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TabList,
  Tab,
  Field,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerProps,
  Tag,
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
  example: {
    width: '100px',
    height: '100px',
    border: '1px solid #ccc',
    margin: '20px 0',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const gridColumns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

const tagOptions = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const ComposedElements = () => {
  const { gamepadNavDOMAttributes } = useGamepadNavigationGroup({
    focusFirstElement: true,
  });

  const styles = useStyles();
  const CalendarMonth = bundleIcon(CalendarMonthRegular, CalendarMonthRegular);
  const path = 'https://www.bing.com/';
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = tagOptions.filter(
    (option) => !selectedOptions.includes(option)
  );

  return (
    <div className={styles.container} {...gamepadNavDOMAttributes}>
      <h1>Navigation with Composed focusable Elements</h1>
      <h3>
        Accordion
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.input}>
        <Accordion>
          <AccordionItem value="1">
            <AccordionHeader>Accordion Header 1</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 1</div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>Accordion Header 2</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 2</div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionHeader>Accordion Header 3</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 3</div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <h3>
        Breadcrumb
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.input}>
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Item 1</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path} icon={<CalendarMonth />}>
              Item 2
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Item 3</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path} current>
              Item 4
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <hr />
      <h3>
        DataGrid
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <DataGrid
          items={items}
          columns={gridColumns}
          sortable
          selectionMode="multiselect"
          getRowId={(item) => item.file.label}
          focusMode="composite"
          style={{ minWidth: '550px' }}
        >
          <DataGridHeader>
            <DataGridRow
              selectionCell={{
                checkboxIndicator: { 'aria-label': 'Select all rows' },
              }}
            >
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Item>>
            {({ item, rowId }) => (
              <DataGridRow<Item>
                key={rowId}
                selectionCell={{
                  checkboxIndicator: { 'aria-label': 'Select row' },
                }}
              >
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      <h3>
        InteractionTag
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <InteractionTag>
          <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
            filled
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
        <InteractionTag appearance="outline">
          <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
            outline
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
        <InteractionTag appearance="brand">
          <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
            brand
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
      </div>
      <hr />
      <h3>
        SwatchPicker
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <SwatchPicker
          aria-label="SwatchPicker default"
          selectedValue={selectedValue}
          onSelectionChange={handleSelect}
        >
          <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
          <ColorSwatch color="#FF7A00" value="FF7A00" aria-label="orange" />
          <ColorSwatch
            color="#90D057"
            value="90D057"
            aria-label="light green"
          />
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
          <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
          <ColorSwatch
            disabled
            color="#011F5E"
            value="011F5E"
            aria-label="dark blue"
          />
          <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
        </SwatchPicker>

        <div
          className={styles.example}
          style={{
            backgroundColor: selectedColor,
          }}
        />
      </div>
      <hr />
      <h3>
        TabList
        <span className={styles.support}>
          Support:
          <CheckmarkCircle20Filled color="#6bb700" />
        </span>
      </h3>
      <div className={styles.row}>
        <TabList>
          <Tab value="tab1">First Tab</Tab>
          <Tab value="tab2">Second Tab</Tab>
          <Tab value="tab3">Third Tab</Tab>
          <Tab value="tab4">Fourth Tab</Tab>
        </TabList>
      </div>
      <hr />
      <h3>
        TagPicker
        <span className={styles.support}>
          Support:
          <ErrorCircle20Filled color="#fce100" />
          {/* DpadRight doesn't focus Tagpicker when already focusing at last tag*/}
        </span>
      </h3>
      <div className={styles.row}>
        <Field label="Select Employees" style={{ maxWidth: 400 }}>
          <TagPicker
            onOptionSelect={onOptionSelect}
            selectedOptions={selectedOptions}
          >
            <TagPickerControl>
              <TagPickerGroup aria-label="Selected Employees">
                {selectedOptions.map((option) => (
                  <Tag
                    key={option}
                    shape="rounded"
                    media={
                      <Avatar aria-hidden name={option} color="colorful" />
                    }
                    value={option}
                  >
                    {option}
                  </Tag>
                ))}
              </TagPickerGroup>
              <TagPickerInput aria-label="Select Employees" />
            </TagPickerControl>
            <TagPickerList>
              {tagPickerOptions.length > 0 ? (
                tagPickerOptions.map((option) => (
                  <TagPickerOption
                    secondaryContent="Microsoft FTE"
                    media={
                      <Avatar
                        shape="square"
                        aria-hidden
                        name={option}
                        color="colorful"
                      />
                    }
                    value={option}
                    key={option}
                  >
                    {option}
                  </TagPickerOption>
                ))
              ) : (
                <TagPickerOption value="no-options">
                  No options available
                </TagPickerOption>
              )}
            </TagPickerList>
          </TagPicker>
        </Field>
      </div>
    </div>
  );
};
