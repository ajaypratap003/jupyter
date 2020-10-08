import React from "react";
import {
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  KebabToggle,
  imgAvatar,
  Page,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageSection
} from '@patternfly/react-core';
import BellIcon from '@patternfly/react-icons/dist/js/icons/bell-icon';
import CogIcon from '@patternfly/react-icons/dist/js/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
import logoDebezium from './images/logo-debezium.svg';
import DebeziumTable from "./components/debeziumTable";

const userDropdownItems = [
  <DropdownGroup key="group 2">
    <DropdownItem key="group 2 profile">My profile</DropdownItem>
    <DropdownItem key="group 2 user" component="button">
      User management
    </DropdownItem>
    <DropdownItem key="group 2 logout">Logout</DropdownItem>
  </DropdownGroup>
];

const headerTools = (
  <PageHeaderTools>
    <PageHeaderToolsGroup
      visibility={{
        default: 'hidden',
        lg: 'visible'
      }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */
    >
      <PageHeaderToolsItem>
        <Button aria-label="Help actions" variant={ButtonVariant.plain}>
          <BellIcon />
        </Button>
      </PageHeaderToolsItem>
      <PageHeaderToolsItem>
        <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
          <CogIcon />
        </Button>
      </PageHeaderToolsItem>
    </PageHeaderToolsGroup>
    <PageHeaderToolsGroup>
      <PageHeaderToolsItem
        visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
      >
        <Dropdown
          isPlain
          position="right"
          onSelect={null}
          isOpen={false}
          toggle={<DropdownToggle onToggle={null}>John Smith</DropdownToggle>}
          dropdownItems={userDropdownItems}
        />
      </PageHeaderToolsItem>
    </PageHeaderToolsGroup>
  </PageHeaderTools>
);

const MyPageHeader = () => {
  const Logo = (
    <Brand className="app-c-page__footer-brand-link" src={logoDebezium} alt="Debezium" style={{width: "180px"}} />
  );

  return <PageHeader showNavToggle={true} logo={Logo} headerTools={headerTools} />
}

const App = () => (
  <Page header={<MyPageHeader />}>
    <React.Suspense fallback={<PageSection>Loading...</PageSection>}>
      <DebeziumTable />
    </React.Suspense>
  </Page>
);

export default App;
