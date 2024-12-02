const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const reports = input.trim().split('\n');

  // The levels are either all increasing or all decreasing.
  // Any two adjacent levels differ by at least one and at most three.
  const isSafe = (levels) => {
    let isAsc = levels[0] < levels[1];
    let prev = levels[0];
    let curr;

    for (let i = 1; i < levels.length; i++) {
      curr = levels[i];
      const delta = curr - prev;
      const absDelta = Math.abs(delta);

      // If we should be climbing, the delta should be greater than 0
      const isNotAsc = isAsc && delta <= 0;

      // If we should be falling, the delta should be less than 0
      const isNotDesc = !isAsc && delta >= 0;

      if (isNotAsc || isNotDesc || absDelta < 0 || absDelta > 3) {
        return false;
      }

      prev = curr;
    }

      return true;
  };

  const getSafeCount = () => {
    return reports.reduce((accumulator, report) => {
      const levels = report.split(' ').map(v => parseInt(v));
      const isReportSafe = isSafe(levels);

      const toAdd = isReportSafe ? 1 : 0;
      return accumulator + toAdd;
    }, 0);
  };

  const getDampenedSafeCount = () => {
    return reports.reduce((accumulator, report) => {
      const levels = report.split(' ').map(v => parseInt(v));

      let permutations = [];
      const curr = [...levels];

      for (let i = 0; i < levels.length; i++) {
        let copy = [...curr];
        copy.splice(i, 1);
        permutations.push(copy)
      }

      const isReportSafe = permutations.reduce((acc, p) => {
        return acc || isSafe(p);
      }, false);

      const toAdd = isReportSafe ? 1 : 0;
      return accumulator + toAdd;
    }, 0);
  }

  console.log({
    'Safe': getSafeCount(),
    'Dampened safe count': getDampenedSafeCount(),
  });
});
