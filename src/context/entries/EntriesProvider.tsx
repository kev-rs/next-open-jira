import { useReducer, useEffect } from 'react';
import { Entry } from '../../server/db/prisma'
import { entryApi } from '../../services';
import { entryReducer } from './entryReducer';
import { Provider } from './store';

export interface INITIAL_STATE {
  entries: Entry[],
}

const initialState: INITIAL_STATE = {
  entries: [],
};

export const EntriesProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {

  const [ state, dispatch ] = useReducer( entryReducer, initialState );

  const refresh = async () => {
    const { data } = await entryApi.get<Entry[]>('/entries');
    dispatch({ type: 'refresh', payload: data});
  }

  const updateEntry = async ({ id, status, info }: Entry) => {
    const { data } = await entryApi.put<Entry>(`/entries/${id}`, { info, status })
    dispatch({ type: 'update', payload: data });
  }

  const newEntry = async (info: string) => {
    const { data } = await entryApi.post<Entry>(`/entries`, { info });
    dispatch({ type: 'new', payload: data });
  }

  const deleteEntry = async (entry: Entry) => {
    const { data } = await entryApi.delete<Entry>(`/entries/${entry.id}`);
    dispatch({ type: 'remove', payload: data });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Provider value={{...state, updateEntry, newEntry, deleteEntry}}>
      { children }
    </Provider>
  )
}
