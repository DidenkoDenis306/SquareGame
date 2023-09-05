export const getSquareRow = (square: number, field: number) => {
  return Math.ceil(square / field);
};

export const getSquareColumn = (square: number, field: number) => {
  const column = square % field;

  return column || field;
};

export const generateSquares = (field: number) => {
  const squares: number[] = [];
  const lastSquareNumber = field ? field ** 2 : 0;

  for (let i = 1; i <= lastSquareNumber; i++) {
    squares.push(i);
  }

  return squares;
};

export const calculateSquareSize = (gameFieldSize: number, field: number) => {
  return gameFieldSize / field - 1;
}