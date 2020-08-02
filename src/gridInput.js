import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function GridSelect({ setGridSize, generateEmptyGrid, setGrid }) {
  const classes = useStyles();
  const [size, setSize] = React.useState('small');

  const handleChange = (event) => {
    setSize(event.target.value);
    if (event.target.value === 'large') {
      setGridSize({
        numCols: 50,
        numRows: 50,
        cellSize: 15
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
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Grid Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          onChange={handleChange}
        >
          <MenuItem name='small' value='small'>25 x 25</MenuItem>
          <MenuItem name='large' value='large'>50 x 50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}