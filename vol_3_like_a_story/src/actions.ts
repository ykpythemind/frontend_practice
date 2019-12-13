import { Action } from 'redux'

export const ADD_USER = 'ADD_USER' as const
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE' as const

/*
 action creators
 */

export interface AddUserAction extends Action {
  type: typeof ADD_USER
  name: string
}

export interface toogleDarkModeAction extends Action {
  type: typeof TOGGLE_DARK_MODE
}

export const addUser: (name: string) => AddUserAction = name => {
  return { type: ADD_USER, name }
}

export const toggleDarkMode: () => toogleDarkModeAction = () => {
  return { type: TOGGLE_DARK_MODE }
}
