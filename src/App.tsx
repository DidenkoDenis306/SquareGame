import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { generateSquares } from './utils/helpers';
import { Mode } from './types/Mode';
import { AlertType } from './types/AlertType';
import { ModeSelect } from './components/ModeSelect';
import Button from '@mui/material/Button/Button';
import { Alerts } from './components/Alerts';
import { Squares } from './components/Squares/Squares';
import { Info } from './components/Info';

function App() {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [activeSquares, setActiveSquares] = useState<number[]>([]);
  const [alert, setAlert] = useState<AlertType | null>(null);

  useEffect(() => {
    async function fetchModes() {
      try {
        const response = await axios.get<Mode[]>(
          'https://60816d9073292b0017cdd833.mockapi.io/modes'
        );
        setModes(response.data);
      } catch (error) {
        console.error('Error while fetching modes', error);
      }
    }
    fetchModes();

    const clearAlert = setTimeout(() => {
      setAlert(null);
    }, 4000);

    return () => clearTimeout(clearAlert);
  }, [alert]);

  const handleButtonClick = () => {
    if (!selectedMode) {
      setAlert(AlertType.PickMode);

      return;
    }

    setIsGameStarted(!isGameStarted);
    setAlert(isGameStarted
      ? AlertType.Finish
      : AlertType.Start
    );
    setActiveSquares(isGameStarted 
      ? activeSquares
      : []
    );
  };

  const handleSquareClick = (square: number) => {
    if (isGameStarted) {
      const updatedSquares = activeSquares.includes(square)
        ? activeSquares.filter((sq) => sq !== square)
        : [square, ...activeSquares];
      setActiveSquares(updatedSquares);
    } else {
      setAlert(AlertType.NotStarted);
    }
  };

  const currentField =
    modes.find((mode) => mode.id === selectedMode)?.field || 5;
  const squares = generateSquares(currentField);

  return (
    <div className="container">
      <div className="game">
        <ModeSelect
          modes={modes}
          setSelectedMode={setSelectedMode}
          setActiveSquares={setActiveSquares}
          selectedMode={selectedMode}
        />

        <Button
          variant="contained"
          onClick={handleButtonClick}
          style={{ marginLeft: '30px', height: '50px', width: '150px' }}>
          {isGameStarted ? 'finish' : 'start'}
        </Button>

        <Squares
          squares={squares}
          activeSquares={activeSquares}
          currentField={currentField}
          handleSquareClick={handleSquareClick}
        />
      </div>

      <Info activeSquares={activeSquares} currentField={currentField} />

      <Alerts alert={alert} />
    </div>
  );
}

export default App;
