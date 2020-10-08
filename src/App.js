import React from "react";
import {
  Brand,
  Page,
  PageHeader,
  PageSection
} from '@patternfly/react-core';
import DebeziumWizard from "./components/debeziumWizard";
import logoDebezium from './images/logo-debezium.svg';

const MyPageHeader = () => {
  const Logo = (
    <a href="#" className="app-c-page__footer-brand-link">
      <Brand src={logoDebezium} alt="Debezium" style={{width: "180px"}} />
    </a>
  );

  return <PageHeader logo={Logo} />
}

const App = () => (
  <Page header={<MyPageHeader />}>
    <React.Suspense fallback={<PageSection>Loading...</PageSection>}>
      <DebeziumWizard />
    </React.Suspense>
  </Page>
);

export default App;
