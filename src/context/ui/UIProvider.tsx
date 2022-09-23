import { UiProvider } from "./store";
import { useReducer } from 'react';
import { uiReducer } from "./uiReducer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface UI_INITIAL_STATE {
  isDragging: boolean;
}

const initialState = {
  isDragging: false,
}

export const UIProvider: React.FC<Props> = ({ children }) => {

  const [ state, dispatch ] = useReducer(uiReducer, initialState);

  const setIsDragging = (status: boolean) => {
    dispatch({type: 'setIsDragging', payload: status})
  }

  return (
    <UiProvider value={{...state, setIsDragging}}>
      { children }
    </UiProvider>
  )
}
