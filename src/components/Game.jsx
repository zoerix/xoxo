import { useState } from "react";
import { Board } from "./Board";


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull (squares) {
  return squares.every(square => square !== '');
}


const Game = () => {
  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const winner = calculateWinner(currentSquares);
  const isFull = isBoardFull(currentSquares);


  const handleNewGame = () => {
    setHistory([Array(9).fill('')]);
    setCurrentMove(0);
  }

  if (winner) {
    alert('💫️🧚‍♀️️🦄️🍀️you have won! 💖️💫️🧚‍♀️️🦄️🍀️ ' + winner);
  } else if (isFull) {
    alert("It's a tie!");
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="newGameButton" onClick={handleNewGame}>new game</button>
      </div>
    </div>
  );
}

export { Game, calculateWinner }