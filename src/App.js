import React, { useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpacePresets from './components/spacePresets'
import OscillatorPresets from './components/oscillatorPresets'
import Rules from './components/rules'
import About from './components/about'
import produce from 'immer'
import GridSelect from './components/gridInput'
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
  const [empty, setEmpty] = useState(true)
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
    }, 30)
  }, [genNum, gridSize])


  const startSimulation = () => {
    setRunning(true)
    runningRef.current = true
    runSimulation()
  }

  const setRandom = () => {
    const rows = []
    for (let i = 0; i < gridSize.numRows; i++) {
      rows.push(Array.from(Array(gridSize.numCols), () => Math.random() > 0.7 ? 1 : 0))
    }
    setEmpty(false)
    return setGrid(rows)
  }

  return (
    <div>
      <h1 style={{marginTop: '40px', marginBottom: '50px'}}>Conway's Game of Life</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div>
          <h3>{`Generation ${genNum} `}</h3>
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
                    setEmpty(false)
                  }}
                  style={{
                    width: gridSize.cellSize,
                    height: gridSize.cellSize,
                    backgroundColor: grid[i][k] ? '#ff7961' : undefined,
                    border: 'solid 1px black'
                  }}
                />
              ))}
          </div>
          <span className={classes.root} style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
            <Button variant='contained' color='secondary' onClick={() => !empty && startSimulation()}>
              Start
            </Button>

            <Button variant='contained' color='secondary' onClick={() => setRunning(false)}>
              Stop
            </Button>

            <Button variant='contained' color='secondary' onClick={() => {
              setGenNum(0)
              setGrid(generateEmptyGrid(gridSize.numRows, gridSize.numCols))
              setRunning(false)
              setEmpty(true)
            }}>
              Clear
            </Button>

            <Button variant='contained' color='secondary' onClick={() => setRandom()}>
              Random
            </Button>

            <GridSelect gridSize={gridSize} empty={empty} running={running} generateEmptyGrid={generateEmptyGrid} setGrid={setGrid} setGridSize={setGridSize} grid={grid} />
          </span>
        </div>
        <div>
          <h3>Presets</h3>
          <SpacePresets gridSize={gridSize} setEmpty={setEmpty} running={running} generateEmptyGrid={generateEmptyGrid} setGrid={setGrid} setGridSize={setGridSize} grid={grid} />
          <OscillatorPresets gridSize={gridSize} setEmpty={setEmpty} running={running} generateEmptyGrid={generateEmptyGrid} setGrid={setGrid} setGridSize={setGridSize} grid={grid} />
        </div>
        <Rules />
      </div>
      <About />
    </div>
  );
}



export default App;
