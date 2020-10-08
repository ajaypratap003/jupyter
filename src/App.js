import React from "react";
import {
  Brand,
  Page,
  PageHeader,
  PageSection
} from '@patternfly/react-core';
import logoDebezium from './images/logo-debezium.svg';
import DebeziumTable from "./components/debeziumTable";

const MyPageHeader = () => {
  const Logo = (
    <Brand className="app-c-page__footer-brand-link" src={logoDebezium} alt="Debezium" style={{width: "180px"}} />
  );

  return <PageHeader logo={Logo} />
}

const App = () => (
  <Page header={<MyPageHeader />}>
    <React.Suspense fallback={<PageSection>Loading...</PageSection>}>
      <DebeziumTable />
    </React.Suspense>
  </Page>
);

export default App;
