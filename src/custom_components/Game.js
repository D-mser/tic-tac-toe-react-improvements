import React from "react";
import Board from "./Board";
import { calculateWinner, getStatusByWinner, getCoordinates } from "../utils";
import Button from "@material-ui/core/Button";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  clearMoves() {
    this.setState((prevState) => ({
      ...prevState,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
    }));
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = history[history.length - 1].squares.slice();
    if (calculateWinner(squares).element || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let winner = calculateWinner(current.squares);
    let status = getStatusByWinner(winner, current.squares, this.state.xIsNext);

    let moves = history.map((step, move) => {
      let squares, row, column;

      if (move) {
        squares = {
          current: step.squares,
          previous: history[move - 1].squares,
        };
        [row, column] = getCoordinates(squares);
        const desc = "Move (" + row + "," + column + ")";
        return (
          <li key={move}>
            <Button
              size="small"
              variant={
                this.state.stepNumber === move ? "contained" : "outlined"
              }
              color="primary"
              className="move"
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </Button>
          </li>
        );
      } else {
        return (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            key={move}
            className="move"
            onClick={() => {
              this.jumpTo(move);
              this.clearMoves();
            }}
          >
            Start game
          </Button>
        );
      }
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerCombination={winner ? winner.combination : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          {moves[0]}
          <div className="status history">Moves History</div>
          <ol>{moves.length > 1 ? moves.slice(1) : ""}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
