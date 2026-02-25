import React, { useState, useEffect, useCallback } from 'react';

const GRID = 20;
const BOARD = 400;
const CELL = BOARD / GRID;
const SPEED = 130;

const Snake = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [dir, setDir] = useState({ x: 0, y: -1 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [paused, setPaused] = useState(false);

    const spawnFood = useCallback((s) => {
        let f;
        do { f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
        while (s.some(seg => seg.x === f.x && seg.y === f.y));
        return f;
    }, []);

    const reset = () => {
        const s = [{ x: 10, y: 10 }];
        setSnake(s);
        setDir({ x: 0, y: -1 });
        setScore(0);
        setGameOver(false);
        setPaused(false);
        setFood(spawnFood(s));
    };

    useEffect(() => {
        const onKey = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
            switch (e.key) {
                case 'ArrowUp': setDir(d => d.y !== 1 ? { x: 0, y: -1 } : d); break;
                case 'ArrowDown': setDir(d => d.y !== -1 ? { x: 0, y: 1 } : d); break;
                case 'ArrowLeft': setDir(d => d.x !== 1 ? { x: -1, y: 0 } : d); break;
                case 'ArrowRight': setDir(d => d.x !== -1 ? { x: 1, y: 0 } : d); break;
                case ' ': setPaused(p => !p); break;
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        if (gameOver || paused) return;
        const id = setInterval(() => {
            setSnake(prev => {
                const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
                if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
                    prev.some(s => s.x === head.x && s.y === head.y)) {
                    setGameOver(true);
                    return prev;
                }
                const ns = [head, ...prev];
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood(spawnFood(ns));
                } else {
                    ns.pop();
                }
                return ns;
            });
        }, SPEED);
        return () => clearInterval(id);
    }, [dir, food, gameOver, paused, spawnFood]);

    return (
        <div className="game-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: BOARD, marginBottom: 12 }}>
                <div className="game-title" style={{ color: '#f87171', marginBottom: 0 }}>🐍 Snake</div>
                <div style={{ fontSize: 18, fontFamily: '"SF Mono", monospace' }}>Score: {score}</div>
            </div>
            <div className="snake-board" style={{ width: BOARD, height: BOARD }}>
                {snake.map((s, i) => (
                    <div key={i} className={`snake-segment ${i === 0 ? 'head' : 'body'}`}
                        style={{ left: s.x * CELL, top: s.y * CELL, width: CELL, height: CELL }} />
                ))}
                <div className="snake-food" style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL }} />
                {gameOver && (
                    <div className="snake-overlay">
                        <div style={{ fontSize: 28, fontWeight: 700, color: '#f87171', marginBottom: 8 }}>Game Over</div>
                        <div style={{ marginBottom: 20 }}>Score: {score}</div>
                        <button className="game-btn" style={{ background: '#4ade80', color: '#111' }} onClick={reset}>Play Again</button>
                    </div>
                )}
                {paused && !gameOver && (
                    <div className="snake-overlay">
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#fbbf24' }}>PAUSED</div>
                    </div>
                )}
            </div>
            <div className="game-hint">Arrow Keys = Move · Space = Pause</div>
        </div>
    );
};

export default Snake;
