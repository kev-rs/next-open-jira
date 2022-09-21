import { createContext } from "react";
import { Entry } from '../../backend/utils/prisma'

interface ENTRIES {
  entries: Entry[];
  addEntry: (info: string) => void;
  updateEntry: (entry: Entry) => void;
  updateEntries: (entries: Entry[]) => void;
  deleteEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext<ENTRIES>({} as ENTRIES);

export const { Provider:EntryProvider } = EntriesContext;
