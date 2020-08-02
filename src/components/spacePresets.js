import React from 'react';
import { lgGlider, lgSwss, lgLwss } from '../presets/lg_presets/lg_spaceships'
import { lwss, glider } from '../presets/spaceships'
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

export default function Presets({ gridSize, generateEmptyGrid, setGrid, running, setEmpty }) {
  const classes = useStyles();
  const [preset, setPreset] = React.useState('');

  const handleChange = (event) => {
    setPreset(event.target.value);
    if (event.target.value === 'glider') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(glider)
      } else {
        setGrid(lgGlider)
      }
    }

    if (event.target.value === 'lwss') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(lwss)
      } else {
        setGrid(lgLwss)
      }
    }

  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel style={{color: '#ba000d'}} id="demo-simple-select-label">Spaceships</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={preset}
          onChange={handleChange}
          color='secondary'
        >
          <MenuItem value='glider'>Glider</MenuItem>
          <MenuItem value='lwss'>LWSS</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
