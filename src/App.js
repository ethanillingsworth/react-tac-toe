import './App.css';
import Tile from './Tile'

import React, { useState } from 'react';


function App() {

    const [currentTurn, setCurrentTurn] = useState("X")
    const [xWins, setXWins] = useState(0)
    const [oWins, setOWins] = useState(0)

    const [disabled, disableBoard] = useState(false)

    const [grid, updateGrid] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ])

    const resetGrid = () => {
        updateGrid([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ])

        disableBoard(false)

        setCurrentTurn("X")
    }

    const checkWinState = () => {
        // check for row wins
        if (grid.some(row => row.every(v => v === "X"))) {
            setXWins(xWins + 1);
            return true;
        }

        if (grid.some(row => row.every(v => v === "O"))) {
            setOWins(oWins + 1);
            return true;
        }

        // check for col wins
        for (let col = 0; col < grid[0].length; col++) {
            let column = grid.map(row => row[col]);

            if (column.every(v => v === "X")) {
                setXWins(xWins + 1);
                return true

            }

            if (column.every(v => v === "O")) {
                setOWins(oWins + 1);
                return true

            }
        }

        // check main diagonal
        let mainDiagonal = grid.map((row, i) => row[i]);

        if (mainDiagonal.every(v => v === "X")) {
            setXWins(xWins + 1);
            return true

        }

        if (mainDiagonal.every(v => v === "O")) {
            setOWins(oWins + 1);
            return true

        }

        // check anti-diagonal
        let antiDiagonal = grid.map((row, i) => row[row.length - 1 - i]);

        if (antiDiagonal.every(v => v === "X")) {
            setXWins(xWins + 1);
            return true

        }

        if (antiDiagonal.every(v => v === "O")) {
            setOWins(oWins + 1);
            return true

        }
        return false
    }

    const handleTileClick = () => {
        setCurrentTurn((prev) => (prev === "X" ? "O" : "X"));

        console.log(checkWinState())
        if (checkWinState()) {
            disableBoard(true)
        }
    };

    const setPos = (x, y, v) => {
        grid[x][y] = v
        updateGrid(grid)
    }

    return (
        <div className="App">
            <h1><span className='blue'>React</span>-Tac-Toe</h1>
            <h2>X - {xWins} | O - {oWins}</h2>
            <h2>{currentTurn}'s Turn</h2>

            <div className='grid'>
                {
                    // setup grid
                    [...Array(3)].map((_, row) => (
                        [...Array(3)].map((_, col) => (
                            <Tile currentTurn={currentTurn} onTileClick={handleTileClick} col={col} row={row} grid={grid} updateGrid={setPos} disabled={disabled} key={col + row} />
                        ))
                    ))
                }
            </div>
            {
                disabled ? <button onClick={resetGrid}>New Game</button> : null
            }

        </div>
    );
}

export default App;
