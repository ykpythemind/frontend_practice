import { addUser, toggleDarkMode } from './actions'

export interface RootState {
  users: User[]
  isDarkMode: boolean
}

export interface User {
  name: string
}

export type RootActions =
  | ReturnType<typeof addUser>
  | ReturnType<typeof toggleDarkMode>
