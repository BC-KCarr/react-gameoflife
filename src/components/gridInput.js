import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function GridSelect({ setGridSize, generateEmptyGrid, setGrid, running, empty }) {
  const [size, setSize] = React.useState('small');

  const handleChange = (event) => {
    setSize(event.target.value);
    if (event.target.value === 'large') {
      setGridSize({
        numCols: 50,
        numRows: 50,
        cellSize: 13
      })
      setGrid(generateEmptyGrid(50, 50))
    } else {
      setGridSize({
        numCols: 25,
        numRows: 25,
        cellSize: 25
      })
      setGrid(generateEmptyGrid(25, 25))
    }

  };

  return (
    <div>
      {!running && empty ? (
        <>
          <InputLabel style={{color: '#ba000d'}} id="demo-simple-select-label">Grid Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
            onChange={handleChange}
            color='secondary'
          >
            <MenuItem name='small' value='small' style={{color: '#ba000d'}}>25 x 25</MenuItem>
            <MenuItem name='large' value='large' style={{color: '#ba000d'}}>50 x 50</MenuItem>
          </Select>
        </>
      ) : (
          <>
            <InputLabel id="demo-simple-select-label">Grid Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              onChange={handleChange}
              disabled
            >
              <MenuItem name='small' value='small'>25 x 25</MenuItem>
              <MenuItem name='large' value='large'>50 x 50</MenuItem>
            </Select>
          </>
        )}
    </div>
  );
}