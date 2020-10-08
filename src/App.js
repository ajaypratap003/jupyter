import React from "react";
import { Page, PageSection, PageHeader } from '@patternfly/react-core';
import Notebook from './components/notebook';

const MyPageHeader = () => {
  return <PageHeader logo="JupyterLab" />
}

const App = () => (
  <Page header={<MyPageHeader />}>
    <React.Suspense fallback={<PageSection>Loading...</PageSection>}>
      <PageSection>
        <Notebook />
      </PageSection>
    </React.Suspense>
  </Page>
);

export default App;
