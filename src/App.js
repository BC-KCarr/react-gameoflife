import React, { useState, useCallback, useRef } from 'react';
import { blinker, toad, pulsar, beacon } from './presets/oscillators'
import produce from 'immer'
import './App.css';

const numRows = 25
const numCols = 25

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

const generateEmptyGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })
  const [running, setRunning] = useState(false)
  let [genNum, setGenNum] = useState(0)

  const runningRef = useRef()
  runningRef.current = running

  // counts neighbors that wrap around to the far side as well 
  const countNeighbors = (grid, x, y) => {
    return operations.reduce((acc, [i, j]) => {
      const row = (x + i + numRows) % numRows;
      const col = (y + j + numCols) % numCols;
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
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
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

    setTimeout(() => {
      runSimulation()
      setGenNum(genNum++)
    }, 100)
  }, [])

  const startStopSimulation = () => {
    setRunning(!running)
    if (!running) {
      runningRef.current = true
      runSimulation()
    }
  }

  const setRandom = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0))
    }
    return setGrid(rows)
  }

  const setPreset = () => {

    return setGrid(pulsar)
  }



  return (
    <div >

    <h1>{`Generation ${genNum} `}</h1>
      <div className='Board'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 25px)`
        }}>
          

        {grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1
                })
                console.log(grid)
                setGrid(newGrid)
              }}
              style={{
                width: 25,
                height: 25,
                backgroundColor: grid[i][k] ? 'green' : undefined,
                border: 'solid 1px black'
              }}
            />
          ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => startStopSimulation()}>
          {running ? 'Stop' : 'Start'}
        </button>

        <button onClick={() => {
          setGrid(generateEmptyGrid())
          setGenNum(0)
          }}>
          Clear
        </button>

        <button onClick={() => setRandom()}>
          Random
        </button>

        <button onClick={() => setPreset()}>
          Preset
        </button>
      </div>
    </div>
  );
}



export default App;
