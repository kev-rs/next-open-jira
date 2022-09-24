import { INITIAL_STATE } from "./EntriesProvider";
import { Entry } from '../../server/db/prisma'

type Actions = 
  | { type: 'refresh', payload: Entry[] }
  | { type: 'update', payload: Entry }
  | { type: 'new', payload: Entry }
  | { type: 'remove', payload: Entry }

export const entryReducer = ( state: INITIAL_STATE, action: Actions ): INITIAL_STATE => {
  switch(action.type) {
    case 'refresh':
      return { ...state, entries: [...action.payload] };
    case 'update':
      return { ...state, entries: state.entries.map((entry) => entry.id === action.payload.id ? action.payload : entry )};
    case 'new':
      return { ...state, entries: [...state.entries, action.payload] }
    case 'remove':
      return { ...state, entries: state.entries.filter(({id}) => id !== action.payload.id) }
    default:
      return state;
  }
}