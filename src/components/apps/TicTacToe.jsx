import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(s => s !== null);

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div className="game-container">
            <div className="game-title" style={{ color: '#6ee7b7' }}>Tic-Tac-Toe</div>
            <div className="game-status">
                {winner ? (
                    <span style={{ color: '#fbbf24' }}>🏆 Winner: {winner}</span>
                ) : isDraw ? (
                    <span style={{ color: '#94a3b8' }}>Draw!</span>
                ) : (
                    <span>Next: <span style={{ color: xIsNext ? '#60a5fa' : '#f87171' }}>{xIsNext ? 'X' : 'O'}</span></span>
                )}
            </div>
            <div className="ttt-board">
                {board.map((cell, i) => (
                    <button key={i} className={`ttt-cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`} onClick={() => handleClick(i)}>
                        {cell}
                    </button>
                ))}
            </div>
            <button className="game-btn" style={{ background: '#6ee7b7', color: '#111' }} onClick={resetGame}>
                Restart
            </button>
        </div>
    );
};

export default TicTacToe;
