import { MouseEvent } from 'react';
import DataGrid, { EventRow, NotificationRow } from '../../common/data-grid';

function Event() {
  const onClickEdit = (e: MouseEvent, row: EventRow | NotificationRow) => {};

  const onClickDelete = (e: MouseEvent, row: EventRow | NotificationRow) => {};

  const onClickSwitch = (e: MouseEvent, row: EventRow | NotificationRow) => {
    const t = e.target as HTMLInputElement;
    const r = row as EventRow;

    console.log(r, t.checked);
  };

  const action = {
    onClickEdit,
    onClickDelete,
    onClickSwitch,
  };

  const events = [
    'on_create_user',
    'on_update_user',
    'on_login',
    'on_logout',
    'on_enter',
    'on_exit',
    'on_message',
    'on_expiry',
    'on_open',
  ];

  const rows = events.map<EventRow>((event, index) => {
    return {
      id: index,
      event,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
  });

  return <DataGrid type='Event' action={action} rows={rows} />;
}

export default Event;
