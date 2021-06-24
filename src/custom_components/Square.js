import React from "react";

function Square(props) {
  return (
    <button
      className={
        "square" +
        (props.winnerCombination &&
        props.winnerCombination.includes(props.order)
          ? " winning-combination"
          : "")
      }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
