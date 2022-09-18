import { createContext } from "react";
import { Entry, TypeAction } from "../../interfaces";

interface ENTRIES {
  entries: Entry[];
  addEntry: (info: string) => void;
  updateEntry: (entry: Entry) => void;
  updateEntries: (entries: Entry[]) => void;
}

export const EntriesContext = createContext<ENTRIES>({} as ENTRIES);

export const { Provider:EntryProvider } = EntriesContext;
