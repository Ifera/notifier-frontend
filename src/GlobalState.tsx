import { useState } from 'react';
import { APPS_PAGE_SIZE, GRID_PAGE_SIZE } from './constants';
import { Query } from './interfaces';

const GlobalState = () => {
  const [appQuery, setAppQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: APPS_PAGE_SIZE,
  });

  const [eventQuery, setEventQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: GRID_PAGE_SIZE,
  });

  const [notifQuery, setNotifQuery] = useState<Query>({
    pageNumber: 1,
    pageSize: GRID_PAGE_SIZE,
  });

  return {
    appQuery,
    setAppQuery,
    eventQuery,
    setEventQuery,
    notifQuery,
    setNotifQuery,
  };
};

export default GlobalState;
