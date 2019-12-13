import { RootState, User, RootActions } from './types'
import { ADD_USER, TOGGLE_DARK_MODE } from './actions'
import { Reducer } from 'redux'

const initialState: RootState = {
  users: [],
  isDarkMode: false
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
    default:
      return state
  }
}
