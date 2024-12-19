const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  let currentPosition = { row: 0, col: 0};
  const rows = input.trim().split('\n');
  const width = rows[0].length;
  const height = rows.length;
  let currentDirection = 'N';

  const data = rows.map((row, i) => {
    if (row.indexOf('^') > 0) {
      currentPosition.col = row.indexOf('^');
      currentPosition.row = i;
    }
    return row.split('')
  });

  const visitedGrid = {};

   const turnRight = (direction) => {
    switch (direction) {
      case 'N':
        return 'E';
        break;
      case 'E':
        return 'S';
        break;
      case 'S':
        return 'W';
        break;
      default:
        return 'N';
    }
  };

  // If there is something directly in front of you, turn right 90 degrees.
  // Otherwise, take a step forward.
  const moveGuard = ({row, col}) => {
    console.log('move', row, col, currentDirection);
    let newPos;
    switch (currentDirection) {
      case 'N':
        newPos = { row: row-1, col}
        break;
      case 'E':
        newPos = { row, col: col+1}
        break;
      case 'S':
        newPos = { row: row+1, col}
        break;
      default:
        newPos = { row, col: col-1}
    }

    if (data[newPos.row][newPos.col] !== '#') {
      return newPos;
    } else {
      currentDirection = turnRight(currentDirection);
      return {row, col};
    }
  };

  const getNumGuardPositions = () => {
    while (currentPosition.row >= 0 && currentPosition.col >= 0 && currentPosition.row < height-1 && currentPosition.col < width-1) {
      if (!visitedGrid[currentPosition.row]) {
        visitedGrid[currentPosition.row] = new Set([currentPosition.col]);
      } else {
        visitedGrid[currentPosition.row].add(currentPosition.col);
      }
      currentPosition = moveGuard(currentPosition);
      i++;
    }

    const keys = Object.keys(visitedGrid);

    count = keys.reduce((acc, key) => {
      const row = visitedGrid[key];
      console.log(row)
      return acc + Array.from(row).length;
    }, 1);

    return count;
  };


  const getNumInfiniteLoops = () => {
    return 1;
  }

  console.log({
    'Part one': getNumGuardPositions(), // 4647
    'Part two': getNumInfiniteLoops(),
  });
});
