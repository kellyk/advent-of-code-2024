const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const rows = input.trim().split('\n');
  const data = rows.map(row => row.split(''));
  const width = rows[0].length;
  const height = rows.length;

  const xMasCountFromPos = (x, y) => {
    let c = 0;
    const xCanGoUp = x + 3 < width;
    const xCanGoDown = x >= 3;
    const yCanGoUp = y + 3 < height;
    const yCanGoDown = y >= 3;

    const isNorth = xCanGoUp && data[x][y] + data[x+1][y] + data[x+2][y] + data[x+3][y] === 'XMAS';
    const isSouth = xCanGoDown && data[x][y] + data[x-1][y] + data[x-2][y] + data[x-3][y] === 'XMAS';
    const isEast = yCanGoUp && data[x][y] + data[x][y+1] + data[x][y+2] + data[x][y+3] === 'XMAS';
    const isWest = yCanGoDown && data[x][y] + data[x][y-1] + data[x][y-2] + data[x][y-3] === 'XMAS';

    const isNorthEast = xCanGoUp && yCanGoUp && data[x][y] + data[x+1][y+1] + data[x+2][y+2] + data[x+3][y+3] === 'XMAS';
    const isNorthWest = xCanGoUp && yCanGoDown && data[x][y] + data[x+1][y-1] + data[x+2][y-2] + data[x+3][y-3] === 'XMAS';
    const isSouthEast = xCanGoDown && yCanGoUp && data[x][y] + data[x-1][y+1] + data[x-2][y+2] + data[x-3][y+3] === 'XMAS';
    const isSouthWest = xCanGoDown && yCanGoDown && data[x][y] + data[x-1][y-1] + data[x-2][y-2] + data[x-3][y-3] === 'XMAS';

    if (isNorth) c++;
    if (isSouth) c++;
    if (isEast) c++;
    if (isWest) c++;
    if (isNorthEast) c++;
    if (isNorthWest) c++;
    if (isSouthEast) c++;
    if (isSouthWest) c++;

    return c;
  }

  const isMasMas = (x, y) => {
    let c = 0;
    const xCanGoUp = x + 1 < width;
    const xCanGoDown = x >= 1;
    const yCanGoUp = y + 1 < height;
    const yCanGoDown = y >= 1;

    if (!xCanGoUp || !xCanGoDown || !yCanGoUp || !yCanGoDown) {
      return false;
    }

    const northEast = data[x-1][y-1];
    const northWest = data[x+1][y-1];
    const southEast = data[x-1][y+1];
    const southWest = data[x+1][y+1];

    /** 1.   2.    3.    4.
     * M.S   S.S   M.M   S.M
       .A.   .A.   .A.   .A.
       M.S   M.M   S.S   S.M
     */

    const result = (northEast === 'M' && southEast === 'M' && northWest === 'S' && southWest === 'S') ||
     (northEast === 'S' && northWest === 'S' && southEast === 'M' && southWest === 'M') ||
     (northEast === 'M' && northWest  === 'M' && southEast === 'S' && southWest === 'S') ||
     (northEast === 'S' && southEast === 'S' && northWest === 'M' && southWest === 'M');

    return result;
  }

  const partOne = () => {
    let count = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        count += xMasCountFromPos(i,j);
      }
    }

    return count;
  };

  const partTwo = () => {
    let count = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (data[i][j] === 'A' && isMasMas(i,j)) {
          count++
        }
      }
    }

    return count;
  }

  console.log({
    'Part 1': partOne(),
    'Part 2': partTwo(),
  });
});
