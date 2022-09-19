import { DragType, EntryType } from "../../interfaces";

export interface UI_STATE {
  status: boolean;
  entryType: EntryType;
  isDragging: boolean;
  dragItem: number | null,
  dragOverItem: number | null,
}

export const UI_INITIAL_STATE: UI_STATE = {
  status: false,
  entryType: null,
  isDragging: false,
  dragItem: null,
  dragOverItem: null,
}

type PayloadActions = 
  | {type: 'setStatus', payload: boolean}
  | {type: 'setEntryType', payload: EntryType}
  | {type: 'setIsDragging', payload: boolean}
  | {type: 'setDragItem', payload: DragType}
  | {type: 'setDragOverItem', payload: DragType}

export const uiReducer = (state: UI_STATE, action: PayloadActions): UI_STATE => {
  switch(action.type) {
    case 'setStatus':
      return { ...state, status: action.payload };
    case 'setEntryType':
      return {...state, entryType: action.payload};
    case 'setIsDragging':
      return {...state, isDragging: action.payload};
    case 'setDragItem':
      return { ...state, dragItem: action.payload}
    case 'setDragOverItem':
      return { ...state, dragOverItem: action.payload}
    default:
      return state;
  }
}
