import { useState } from 'react';
import ToolBar from '../../common/toolbar';
import Application from '../../components/application';
import { APPS_CARDS_PER_PAGE } from '../../constants';
import { ApplicationQuery, ID } from '../../interfaces';

interface ApplicationContainerProps {
  onAppSelect: (id: ID) => void;
}

function ApplicationContainer({ onAppSelect }: ApplicationContainerProps) {
  const [query, setQuery] = useState<ApplicationQuery>({
    pageNumber: 0,
    pageSize: APPS_CARDS_PER_PAGE,
  });

  return (
    <>
      <ToolBar title='Applications' query={query} setQuery={setQuery} />
      <Application
        onAppSelect={onAppSelect}
        query={query}
        setQuery={setQuery}
        cardsPerPage={APPS_CARDS_PER_PAGE}
      />
    </>
  );
}

export default ApplicationContainer;
