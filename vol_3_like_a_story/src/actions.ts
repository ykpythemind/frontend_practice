import { Action } from 'redux'
import { User } from './types'

export const ADD_USER = 'ADD_USER' as const
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE' as const
export const START_LOADING = 'START_LOADING' as const
export const FINISH_LOADING = 'FINISH_LOADING' as const
export const LOAD_USER = 'LOAD_USER' as const

export interface AddUserAction extends Action {
  type: typeof ADD_USER
  name: string
}

export interface toogleDarkModeAction extends Action {
  type: typeof TOGGLE_DARK_MODE
}

export interface startLoadingAction extends Action {
  type: typeof START_LOADING
}

export interface finishLoadingAction extends Action {
  type: typeof FINISH_LOADING
}

export interface loadUserAction extends Action {
  type: typeof LOAD_USER
  payload: User[]
}

/*
 action creators
 */

export const addUser: (name: string) => AddUserAction = name => {
  return { type: ADD_USER, name }
}

export const toggleDarkMode: () => toogleDarkModeAction = () => {
  return { type: TOGGLE_DARK_MODE }
}

export const startLoading: () => startLoadingAction = () => {
  return { type: START_LOADING }
}

export const finishLoading: () => finishLoadingAction = () => {
  return { type: FINISH_LOADING }
}

export const loadUser: (users: User[]) => loadUserAction = users => ({
  type: LOAD_USER,
  payload: users
})
