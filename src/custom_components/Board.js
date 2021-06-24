import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        order={i}
        onClick={() => this.props.onClick(i)}
        winnerCombination={this.props.winnerCombination}
      />
    );
  }

  render() {
    const renderedSquares = [0, 3, 6].map((value) => {
      return (
        <div className="board-row" key={value}>
          {this.renderSquare(value)}
          {this.renderSquare(value + 1)}
          {this.renderSquare(value + 2)}
        </div>
      );
    });

    return <div>{renderedSquares}</div>;
  }
}

export default Board;
