import { Entry } from "../../interfaces";

interface ENTRIES_INIT_STATE {
  entries: Entry[];
}

export const Entries_INIT_STATE: ENTRIES_INIT_STATE = {
  entries: []
}

type PayloadActions = 
  | {type: 'add', payload: Entry}
  | {type: 'update', payload: Entry}
  | {type: 'updateAll', payload: Entry[]}
  | {type: 'refresh', payload: Entry[]}

export const entriesReducer = (state: ENTRIES_INIT_STATE, action: PayloadActions): ENTRIES_INIT_STATE => {
  switch(action.type) {
    case 'add':
      return {
        ...state,
        entries: [ ...state.entries, action.payload ]
      };
    case 'update':
      return {
        ...state,
        entries: state.entries.map((entry) => (entry.id === action.payload.id) ? action.payload : entry)
      };
    case 'updateAll':
      return { ...state, entries: action.payload };
    case 'refresh':
      return { ...state, entries: [...action.payload] };
    default:
      return state;
  };
};
