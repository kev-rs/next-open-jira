import { UI_INITIAL_STATE } from "./UIProvider";


type Actions = 
  | { type: 'setIsDragging', payload: boolean }


export const uiReducer = (state: UI_INITIAL_STATE, action: Actions): UI_INITIAL_STATE => {
  switch(action.type) {
    case 'setIsDragging':
      return { ...state, isDragging: action.payload }
    default:
      return state;
  }
}