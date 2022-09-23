import { createContext } from 'react';

interface Store {
  isDragging: boolean;
  setIsDragging: (status: boolean) => void;
}

export const UIContext = createContext<Store>( {} as Store );

export const { Provider: UiProvider } = UIContext;