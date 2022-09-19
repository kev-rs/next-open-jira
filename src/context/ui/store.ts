import { createContext } from 'react';
import { DragType, EntryType } from '../../interfaces';

interface Store {
  status: boolean;
  entryType: EntryType;
  isDragging: boolean;
  setStatus: (status:boolean) => void;
  setEntryType: (status: EntryType) => void;
  setIsDragging: (status: boolean) => void;
  dragItem: DragType;
  dragOverItem: DragType;
  setDragItem: (index: DragType) => void;
  setDragOverItem: (index: DragType) => void;
}

export const UIContext = createContext<Store>({} as Store);

export const { Provider } = UIContext;
