import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Mode } from '../../types/Mode';

interface Props {
  modes: Mode[];
  setSelectedMode: (modeId: string | null) => void;
  setActiveSquares: (activeSquares: number[]) => void;
  selectedMode: string | null;
}

export const ModeSelect: FC<Props> = ({
  modes,
  setSelectedMode,
  setActiveSquares,
  selectedMode,
}) => {
  const handleModeChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setSelectedMode(selectedValue);
    setActiveSquares([]);
  };

  return (
    <FormControl style={{ width: '300px' }}>
      <InputLabel id="demo-simple-select-label">Pick mode</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedMode || ''}
        label="Pick mode"
        style={{ height: '50px' }}
        onChange={handleModeChange}>
        {modes.map((mode) => (
          <MenuItem key={mode.id} value={mode.id}>
            {mode.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
