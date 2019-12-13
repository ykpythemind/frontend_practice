import * as actions from './actions'

export interface RootState {
  users: User[]
  isDarkMode: boolean
  isLoading: boolean
}

export interface User {
  name: string
}

export type RootActions =
  | ReturnType<typeof actions.addUser>
  | ReturnType<typeof actions.toggleDarkMode>
  | ReturnType<typeof actions.finishLoading>
  | ReturnType<typeof actions.startLoading>
  | ReturnType<typeof actions.loadUser>

// NOTE: return type使う必要なさそう (addUserActionなどを定義しているので・・・)
