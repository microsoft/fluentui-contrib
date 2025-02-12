import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  FluentProvider,
} from '@fluentui/react-components';
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = 'https://www.bing.com/';

export const BreadcrumbExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
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
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
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
    </FluentProvider>
  </div>
);
