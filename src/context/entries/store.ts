import { createContext } from 'react';
import { Entry } from '../../server/db/prisma'

interface Store {
  entries: Entry[];
  updateEntry: (entry: Entry) => void;
  newEntry: (info: string) => void;
  deleteEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext<Store>( {} as Store );

export const { Provider } = EntriesContext;