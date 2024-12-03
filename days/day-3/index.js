const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;

  }

  const getProduct = (str) => {
    const regex = /mul\(\d{1,3}\,\d{1,3}\)+/g; // Use the 'g' flag for global search
    const matches = str.match(regex);
    if (!matches) {
      return 0;
    }
    const result = matches.reduce((acc, match) => {
      const parts = match.split(',');
      const left = parseInt(parts[0].slice(4));
      const right = parseInt(parts[1].slice(0,parts[1].length-1));

      return acc + (left * right);
    }, 0)
    return result;

  };

  const getProductDos = () => {
    const pieces = input.split("don't");

    const validPieces = pieces.map((piece) => {
      const doIndex = piece.indexOf('do');
      return piece.slice(doIndex);
    });

    return [pieces[0], ...validPieces].reduce((acc, curr) => {
      return acc + getProduct(curr);
    }, 0);
  }

  console.log({
    'Part 1': getProduct(input),
    'Part 2': getProductDos(),
  });
});
