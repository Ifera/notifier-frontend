import { MouseEvent } from 'react';

interface BaseRow {
  id: number | string;
  description: string;
}

export interface EventRow extends BaseRow {
  event: string;
}

export interface NotificationRow extends BaseRow {
  notification: string;
}

export interface ActionMap {
  onClickEdit: (e: MouseEvent, row: EventRow | NotificationRow) => void;
  onClickDelete: (e: MouseEvent, row: EventRow | NotificationRow) => void;
  onClickSwitch: (e: MouseEvent, row: EventRow | NotificationRow) => void;
}
