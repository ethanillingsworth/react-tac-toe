import React from 'react';

function displayXorO(val) {
    if (val == null) {
        return
    }
    else if (val === "X") {
        return <span className='blue'>X</span>;
    } else {
        return <span className='red'>O</span>;
    }
}


function Tile({ currentTurn, onTileClick, col, row, grid, updateGrid, disabled }) {

    const handleClick = () => {
        if (!disabled && grid[row][col] === null) {
            if (currentTurn === "X") {
                updateGrid(row, col, "X")
                currentTurn = "O"

            }
            else {
                updateGrid(row, col, "O")
                currentTurn = "X"
            }

            onTileClick()
        }
    };

    return (<div className="Tile" onClick={handleClick}>
        {displayXorO(grid[row][col])}
    </div>)
}


export default Tile