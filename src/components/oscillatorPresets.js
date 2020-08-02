import React from 'react';
import { blinker, toad, pulsar, beacon } from '../presets/oscillators'
import { lgBlinker, lgToad, lgPulsar, lgBeacon } from '../presets/lg_presets/lg_oscillators'
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
    if (event.target.value === 'blinker') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(blinker)
      } else {
        setGrid(lgBlinker)
      }
    }

    if (event.target.value === 'toad') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(toad)
      } else {
        setGrid(lgToad)
      }
    }

    if (event.target.value === 'pulsar') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(pulsar)
      } else {
        setGrid(lgPulsar)
      }
    }

    if (event.target.value === 'beacon') {
      setEmpty(false)
      if (gridSize.numRows === 25) {
        setGrid(beacon)
      } else {
        setGrid(lgBeacon)
      }
    }

  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Oscillators</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={preset}
          onChange={handleChange}
        >
          <MenuItem value='pulsar'>Pulsar</MenuItem>
          <MenuItem value='blinker'>Blinker</MenuItem>
          <MenuItem value='toad'>Toad</MenuItem>
          <MenuItem value='beacon'>Beacon</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
