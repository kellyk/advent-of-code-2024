const fs = require('fs');

fs.readFile('data/sample.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const data = input.trim().split('\n');
  console.log(data);

  const partOne = () => {
    return 0;
  }

  const partTwo = () => {
    return 0;
  }

  console.log({
    'Part One': partOne(),
    'Part Two': partTwo(),
  });
});
