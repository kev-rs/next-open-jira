import { useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { entriesReducer, Entries_INIT_STATE } from './entriesReducer';
import { EntryProvider } from './store';
import { entriesApi } from '../../services';

interface ENTRIES_ {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: React.FC<ENTRIES_> = ({ children }) => {
  
  const [ state, dispatch ] = useReducer(entriesReducer, Entries_INIT_STATE);
  
  const addEntry = async (info: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { info });
    dispatch({type: 'add', payload: data})
  };

  const updateEntry = async ({ id, info, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${id}`, { info, status });
      dispatch({type: 'update', payload: data})
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntries = (entries: Entry[]) => dispatch({type: 'updateAll', payload: entries})

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: 'refresh', payload: data})
  }

  useEffect(() => {
    refreshEntries();
  }, []);
  
 return (
   <EntryProvider value={{...state, addEntry, updateEntry, updateEntries}}>
     { children }
   </EntryProvider>
 )
}
