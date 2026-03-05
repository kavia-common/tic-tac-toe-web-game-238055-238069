import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Main App component for Tic Tac Toe game.
 * Handles theme toggling, layout, and game integration.
 */
// PUBLIC_INTERFACE
function App() {
  // Theme state and setTheme
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: '100vh', padding: 0 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="ttt-title">Tic Tac Toe</div>
        <div className="ttt-center-wrap">
          <TicTacToeGame />
        </div>
        <div className="ttt-footer">
          <span>
            Made with <span style={{ color: '#EF4444' }}>♥</span> using React
          </span>
        </div>
      </header>
    </div>
  );
}

/**
 * Main TicTacToeGame component.
 * Manages board state, win/draw logic, turn switching, and reset.
 */
// PUBLIC_INTERFACE
function TicTacToeGame() {
  // The 9 squares, null | 'X' | 'O'
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Calculate status every move: win/draw/ongoing
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner === 'X' ? 'X' : 'O'}`);
      setGameOver(true);
    } else if (isBoardFull(squares)) {
      setStatus('Draw!');
      setGameOver(true);
    } else {
      setStatus(`Turn: ${xIsNext ? 'X' : 'O'}`);
      setGameOver(false);
    }
  }, [squares, xIsNext]);

  // Handle click on square
  // PUBLIC_INTERFACE
  const handleClick = (idx) => {
    if (gameOver || squares[idx]) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('Turn: X');
    setGameOver(false);
  };

  // Render
  return (
    <div className="ttt-wrapper">
      <GameStatus status={status} />
      <GameBoard squares={squares} onSquareClick={handleClick} winningLine={calculateWinner(squares, true)} />
      <button
        className="ttt-resetBtn"
        onClick={handleReset}
        aria-label="Restart game"
        disabled={!gameOver && squares.every(sq => !sq)}
      >
        Restart
      </button>
    </div>
  );
}

/**
 * GameBoard displays 3x3 grid of squares
 */
function GameBoard({ squares, onSquareClick, winningLine }) {
  // Highlight winning squares
  // Flat render; responsive design in CSS
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          highlight={winningLine ? winningLine.includes(idx) : false}
          aria-label={`Row ${Math.floor(idx / 3) + 1}, Column ${(idx % 3) + 1}, ${value ? value : 'empty'}`}
        />
      ))}
    </div>
  );
}

/**
 * Square component for each cell.
 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      tabIndex={0}
      style={{
        color:
          value === 'X'
            ? 'var(--primary, #3b82f6)'
            : value === 'O'
            ? 'var(--success, #06b6d4)'
            : 'var(--text-primary)',
      }}
      aria-label={value ? `Mark ${value}` : 'Empty'}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

/**
 * GameStatus shows win/draw/turn.
 */
function GameStatus({ status }) {
  let color =
    status === 'Draw!'
      ? 'var(--secondary, #64748b)'
      : status.startsWith('Winner')
      ? 'var(--success, #06b6d4)'
      : 'var(--primary, #3b82f6)';
  if (/Winner: X/.test(status)) color = 'var(--primary, #3b82f6)';
  if (/Winner: O/.test(status)) color = 'var(--success, #06b6d4)';
  if (status === 'Draw!') color = 'var(--error, #EF4444)';
  return (
    <div className="ttt-status" style={{ color }}>
      {status}
    </div>
  );
}

/**
 * Utility: checks if board is full
 */
function isBoardFull(squares) {
  return squares.every((sq) => sq !== null);
}

/**
 * Returns winner symbol or null.
 * If getLine is true, also returns winning line indices.
 * @param {*} squares
 * @param {*} getLine boolean
 * @returns string | null | array (if getLine)
 */
function calculateWinner(squares, getLine = false) {
  // All possible lines (row, col, diag)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if (getLine) return line;
      return squares[a];
    }
  }
  return getLine ? null : null;
}

export default App;
