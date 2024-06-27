import * as React from 'react';

import {
  Accordion,
  Avatar,
  Button,
  Card,
  Caption1,
  CardHeader,
  Checkbox,
  Combobox,
  Divider,
  Field,
  Input,
  Label,
  Link,
  ProgressBar,
  RadioGroup,
  Radio,
  Slider,
  Spinner,
  SpinButton,
  Switch,
  TabList,
  Tab,
  Text,
  Textarea,
  Tooltip,
  Option,
} from '@fluentui/react-components';

export const Controls = () => {
  const controlStyles = { margin: '10px', padding: '10px' };

  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <div>
      <h1 style={{ padding: '10px' }}>Controls</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <Avatar style={controlStyles} />
        </div>
        <div style={{ display: 'flex' }}>
          <Card style={controlStyles}>
            <CardHeader
              header={<Text weight="semibold">App Name</Text>}
              description={<Caption1>Developer</Caption1>}
              action={
                <Button appearance="transparent" aria-label="More options" />
              }
            />
          </Card>
        </div>
        <div style={{ display: 'flex' }}>
          <Checkbox style={controlStyles} />
        </div>
        <div style={{ display: 'flex' }}>
          <Combobox placeholder="Select an animal">
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Combobox>
        </div>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Divider style={controlStyles} />
        </div>
        <div style={{ display: 'flex' }}>
          <Field
            style={controlStyles}
            label="Example field"
            validationState="success"
            validationMessage="This is a success message."
          >
            <Input placeholder="Placeholder text" />
          </Field>
        </div>
        <div style={{ display: 'flex' }}>
          <Label style={controlStyles}>This is a label</Label>
        </div>
        <div style={{ display: 'flex' }}>
          <Link style={controlStyles}>This is a link</Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Field
            validationMessage="Default ProgressBar"
            validationState="none"
            style={controlStyles}
          >
            <ProgressBar value={0.5} />
          </Field>
        </div>
        <div style={{ display: 'flex' }}>
          <Field style={controlStyles} label="Favorite Fruit">
            <RadioGroup>
              <Radio value="apple" label="Apple" />
              <Radio value="pear" label="Pear" />
              <Radio value="banana" label="Banana" />
              <Radio value="orange" label="Orange" />
            </RadioGroup>
          </Field>
        </div>
        <div style={{ display: 'flex' }}>
          <Label style={controlStyles}>Slider</Label>
          <Slider defaultValue={20} />
        </div>
        <div style={{ display: 'flex' }}>
          <Spinner style={controlStyles} defaultValue={20} />
        </div>
        <div style={{ display: 'flex' }}>
          <SpinButton style={controlStyles} defaultValue={20} />
        </div>
        <div style={{ display: 'flex' }}>
          <Switch style={controlStyles} />
        </div>
        <div style={{ display: 'flex' }}>
          <TabList defaultSelectedValue="tab2">
            <Tab value="tab1">First Tab</Tab>
            <Tab value="tab2">Second Tab</Tab>
            <Tab value="tab3">Third Tab</Tab>
            <Tab value="tab4">Fourth Tab</Tab>
          </TabList>
        </div>
        <div style={{ display: 'flex' }}>
          <Text style={controlStyles}>This is a text element</Text>
        </div>
        <div style={{ display: 'flex' }}>
          <Field label="Default Textarea" style={controlStyles}>
            <Textarea />
          </Field>
        </div>
        <div style={{ display: 'flex' }}>
          <Tooltip content="Example tooltip" relationship="label">
            <Button style={controlStyles} size="medium">
              {' '}
              Tooltip{' '}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
