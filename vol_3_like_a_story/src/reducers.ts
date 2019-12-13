import { RootState, User, RootActions } from './types'
import {
  ADD_USER,
  TOGGLE_DARK_MODE,
  START_LOADING,
  FINISH_LOADING,
  LOAD_USER
} from './actions'
import { Reducer } from 'redux'

const initialState: RootState = {
  users: [],
  isDarkMode: false,
  isLoading: false
}

export const reducer: Reducer = (
  state: RootState = initialState,
  action: RootActions
) => {
  switch (action.type) {
    case ADD_USER:
      let u = state.users
      const newUser: User = { name: action.name }
      return { ...state, users: u.concat(newUser) }
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode }
    case START_LOADING:
      return { ...state, isLoading: true }
    case FINISH_LOADING:
      return { ...state, isLoading: false }
    case LOAD_USER:
      const users = action.payload
      return { ...state, users: users }
    default:
      return state
  }
}
