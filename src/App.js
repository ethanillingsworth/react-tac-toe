import './App.css';
import Column from './Column';
import Row from './Row';
import Tile from './Tile'
import React, { useState } from 'react';


function App() {
    // game logic
    const [currentTurn, setCurrentTurn] = useState("X")
    const [xWins, setXWins] = useState(0)
    const [oWins, setOWins] = useState(0)
    const [disabled, disableBoard] = useState(false)

    const [width, setWidth] = useState(3)
    const [height, setHeight] = useState(3)


    const [grid, updateGrid] = useState([

    ])


    if (grid.length < 1) {
        for (let y = 0; y < height; y++) {
            grid.push([])
            for (let x = 0; x < width; x++) {
                grid[y].push(null)
            }

        }
    }


    const resetGrid = (w = width, h = height) => {

        const newGrid = []

        for (let y = 0; y < h; y++) {
            newGrid.push([])
            for (let x = 0; x < w; x++) {
                newGrid[y].push(null)
            }

        }
        updateGrid(newGrid)

        disableBoard(false)

        setCurrentTurn("X")
    }



    const checkWinState = () => {
        // Check for row wins
        if (grid.some(row => row.every(v => v === "X"))) {
            setXWins(xWins + 1);
            return true;
        }

        if (grid.some(row => row.every(v => v === "O"))) {
            setOWins(oWins + 1);
            return true;
        }

        // Check for column wins
        for (let col = 0; col < grid[0].length; col++) {
            let column = grid.map(row => row[col]);

            if (column.every(v => v === "X")) {
                setXWins(xWins + 1);
                return true;
            }

            if (column.every(v => v === "O")) {
                setOWins(oWins + 1);
                return true;
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

        if (grid.every((row) => row.every((v) => { return v != null }))) {
            return true
        }


        return false
    }

    const handleTileClick = () => {
        setCurrentTurn((prev) => (prev === "X" ? "O" : "X"));


        if (checkWinState()) {
            disableBoard(true)
        }
    };

    const setPos = (x, y, v) => {
        grid[x][y] = v
        updateGrid(grid)
    }

    const gridStyle = {
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gridTemplateColumns: `repeat(${width}, 1fr)`
    }

    return (
        <div className="App">
            <Column id="left">
                <h1><span className='blue'>React</span>-Tac-Toe</h1>
                <Row>
                    <h2>Width:</h2>
                    <input type="number" defaultValue={3} onChange={(ev) => {
                        if (ev.target.valueAsNumber > -1) {
                            resetGrid(ev.target.valueAsNumber, height)
                            setWidth(ev.target.valueAsNumber)
                        }
                    }} />
                </Row>
                <Row>
                    <h2>Height:</h2>
                    <input type="number" defaultValue={3} onChange={(ev) => {
                        if (ev.target.valueAsNumber > -1) {
                            resetGrid(width, ev.target.valueAsNumber)
                            setHeight(ev.target.valueAsNumber)

                        }
                    }} />
                </Row>


                {disabled ? <button onClick={resetGrid}>New Game</button> : null}
            </Column>
            <Column>
                <h2><span className='blue'>X</span> - {xWins} | <span className='red'>O</span> - {oWins}</h2>
                <h2>{currentTurn}'s Turn</h2>
                <div className='grid' style={gridStyle}>
                    {
                        // setup grid
                        [...Array(height)].map((_, row) => (
                            [...Array(width)].map((_, col) => (
                                <Tile currentTurn={currentTurn} onTileClick={handleTileClick} col={col} row={row} grid={grid} updateGrid={setPos} disabled={disabled} key={col + row} />
                            ))
                        ))
                    }
                </div>
            </Column>

        </div>
    );
}

export default App;
