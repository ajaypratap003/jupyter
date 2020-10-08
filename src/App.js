import React from "react";
import { Page, PageHeader, PageSection, Title } from '@patternfly/react-core';
import DebeziumWizard from "./components/debeziumWizard";

const MyPageHeader = () => {
  const Logo = (
    <Title headingLevel="h1" size="xl" style={{ color: 'white' }}>
      Debezium
    </Title>
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
