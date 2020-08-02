import React, { useState, useCallback, useRef, useReducer, useEffect } from 'react';
import { blinker, toad, pulsar, beacon } from './presets/oscillators'
import { lwss, glider } from './presets/spaceships'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import produce from 'immer'
import GridSelect from './gridInput'
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const generateEmptyGrid = (numRows, numCols) => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}


function App() {
  const [gridSize, setGridSize] = useState({
    numRows: 25,
    numCols: 25,
    cellSize: 25
  })
  const [running, setRunning] = useState(false)
  let [genNum, setGenNum] = useState(0)
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize.numRows, gridSize.numCols)
  })
  
  const classes = useStyles();

  
  const runningRef = useRef()
  runningRef.current = running

  // counts neighbors that wrap around to the far side as well 
  const countNeighbors = (grid, x, y) => {
    return operations.reduce((acc, [i, j]) => {
      const row = (x + i + gridSize.numRows) % gridSize.numRows;
      const col = (y + j + gridSize.numCols) % gridSize.numCols;
      acc += grid[row][col];
      return acc;
    }, 0);

  };

  const runSimulation = useCallback(() => {
    // base case that kills simulation
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      // produce is a helper function from immer that lets us write 
      // immutable js easily 
      return produce(g, gridCopy => {
        // loop through every cell in current grid
        for (let i = 0; i < gridSize.numRows; i++) {
          for (let k = 0; k < gridSize.numCols; k++) {
            // count the num of neighbors 
            const neighbors = countNeighbors(g, i, k)

            // cell dies 
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
              // cell reproduces 
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })

    return setTimeout(() => {
      setGenNum(genNum++)
      runSimulation()
    }, 50)
  }, [genNum, gridSize])


  const startStopSimulation = () => {
    setRunning(!running)
    if (!running) {
      runningRef.current = true
      runSimulation()
    }
  }

  const setRandom = () => {
    const rows = []
    for (let i = 0; i < gridSize.numRows; i++) {
      rows.push(Array.from(Array(gridSize.numCols), () => Math.random() > 0.7 ? 1 : 0))
    }
    return setGrid(rows)
  }

  const setPreset = () => {
    return setGrid(lwss)
  }

  return (
    <div >

      <h1>{`Generation ${genNum} `}</h1>
      <div className='Board'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize.numCols}, ${gridSize.cellSize}px)`
        }}>


        {grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1
                })
                console.log(newGrid)
                setGrid(newGrid)
              }}
              style={{
                width: gridSize.cellSize,
                height: gridSize.cellSize,
                backgroundColor: grid[i][k] ? 'green' : undefined,
                border: 'solid 1px black'
              }}
            />
          ))}
      </div>
      <div className={classes.root} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='contained' onClick={() => startStopSimulation()}>
          {running ? 'Stop' : 'Start'}
        </Button>

        <Button variant='contained' onClick={() => {
          setGrid(generateEmptyGrid(gridSize.numRows, gridSize.numCols))
          setGenNum(0)
        }}>
          Clear
        </Button>

        <Button variant='contained' onClick={() => setRandom()}>
          Random
        </Button>

        <Button variant='contained' onClick={() => setPreset()}>
          Preset
        </Button>
        <GridSelect gridSize={gridSize} generateEmptyGrid={generateEmptyGrid} setGrid={setGrid} setGridSize={setGridSize} grid={grid} />
      </div>
    </div>
  );
}



export default App;
