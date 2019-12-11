import React from 'react'
import './App.css'

import Board from './Board'
import { SquareNumber } from './Square'

export type Mark = '0' | 'x' | null
export type squares = Array<Mark>

type history = Array<{ squares: squares }>

export interface GameState {
  history: history
  xIsNext: boolean
  stepNumber: number
}

export function calculateWinner(squares: squares): Mark {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const getNextMark = (xIsNext: boolean): Mark => {
  return xIsNext ? 'x' : '0'
}

class App extends React.Component<{}, GameState> {
  constructor(props: Object) {
    super(props)
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleSquareClick(i: SquareNumber) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) != null || squares[i]) {
      return
    }

    squares[i] = getNextMark(this.state.xIsNext)
    const newHistory = history.concat({ squares }) // push() メソッドの方に慣れているかもしれませんが、それと違って concat() は元の配列をミューテートしないため、こちらを利用します。 とのこと
    this.setState({
      history: newHistory,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status: string
    if (winner) {
      status = `Winner is ${winner}`
    } else {
      status = `Next player: ${getNextMark(this.state.xIsNext)}`
    }

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            onClick={i => this.handleSquareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default App
