import React from 'react'
import { Square, SquareNumber } from './Square'
import { GameState, squares } from './App'

interface BoardProps {
  onClick: (_: SquareNumber) => void
  squares: squares
  xIsNext: boolean
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: SquareNumber) {
    return (
      <Square
        mark={this.props.squares[i]}
        num={i}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

export default Board
