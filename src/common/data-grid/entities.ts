interface BaseRow {
  id: number | string;
  description: string;
  is_active: boolean;
}

export interface EventRow extends BaseRow {
  event: string;
}

export interface NotificationRow extends BaseRow {
  notification: string;
}

export interface ActionMap {
  onClickEdit: (id: number | string) => void;
  onClickDelete: (id: number | string) => void;
  onClickSwitch: (id: number | string, value: boolean) => void;
}
