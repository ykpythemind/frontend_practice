import React from 'react'
import { Mark } from './App'

export type SquareNumber = number

interface Props {
  num: SquareNumber
  mark: Mark
  onClick: () => void
}

export const Square: React.FC<Props> = props => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.mark}
    </button>
  )
}
