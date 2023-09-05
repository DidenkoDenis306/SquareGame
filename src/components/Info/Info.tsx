import { FC } from 'react';
import { getSquareRow, getSquareColumn } from '../../utils/helpers';

interface Props {
  activeSquares: number[];
  currentField: number;
}

export const Info: FC<Props> = ({ activeSquares, currentField }) => {
  return (
    <div className="info">
      <h1 className="info-title">Hover squares</h1>
      {activeSquares.map((square) => (
        <div className="selected-squares-info">
          {`row ${getSquareRow(
            square,
            currentField as number
          )} col ${getSquareColumn(square, currentField as number)}`}
        </div>
      ))}
    </div>
  );
};
