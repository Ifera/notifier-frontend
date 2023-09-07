export interface Event {
  id: number | string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
  application: number | string;
}

export interface PEvent extends Partial<Event> {}
