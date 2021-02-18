export const getCoordinates = (squares) => {
	let column = Array.from({length: squares.current.length}, (v, i) => i).filter(x => squares.previous[x] !== squares.current[x])[0];
	let row;

	if (column < 3) {
		row = 1;
		column += 1;
	} else if (column >= 3 && column < 6) {
		row = 2;
		column -= row; 
	} else {
		row = 3;
		column -= 5;
	}
	return [row, column];
}

export const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { element: squares[a], combination: [a,b,c]};
		}
	}
	return { element: null, combination: [null,null,null] };
}

export const getStatusByWinner = (winner, values, xIsNext) => {
	let status;

	if (winner.element) {
		status = 'Winner is ' + winner.element;
	} else if (values.every(function (e) { return (e); })) {
		status = 'It\'s a draw!';
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	return status;
}