export interface Entry {
  id: string;
  info: string;
  createdAt: number;
  status: EntryStatus;
}

export interface TypeAction {
  status: EntryStatus;
  id: string;
}

export type DragType = number | null;

export type EntryStatus = 'pending' | 'in_progress' | 'completed';

export type EntryType = 'add' | 'close' | null;