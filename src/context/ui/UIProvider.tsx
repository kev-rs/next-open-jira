import { useReducer } from 'react';
import { DragType, EntryType } from '../../interfaces';
import { Provider } from './store'
import { uiReducer, UI_INITIAL_STATE } from './uiReducer';

type Provider_ = { children: JSX.Element | JSX.Element[] };

export const UIProvider: React.FC<Provider_> = ({ children }) => {

  const [ state, dispatch ] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setStatus = (status: boolean) => {
    dispatch({type: 'setStatus', payload: status});
  };

  const setEntryType = (status: EntryType) => {
    dispatch({type: 'setEntryType', payload: status})
  }

  const setIsDragging = (status: boolean) => {
    dispatch({type: 'setIsDragging', payload: status});
  }

  const setDragItem = (index: DragType) => {
    dispatch({type: 'setDragItem', payload: index})
  }

  const setDragOverItem = (index: DragType) => {
    dispatch({type: 'setDragOverItem', payload: index})
  }

  return (
    <Provider value={{...state, setStatus, setEntryType, setIsDragging, setDragItem, setDragOverItem}}>
      { children }
    </Provider>
  )
}
