const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const tuples = input.split('\n');
  let left = [];
  let right = [];
  tuples.forEach((tuple) => {
    const [l, r] = tuple.split('   ');
    l && left.push(l);
    r && right.push(r);
  });

  const getDelta = () => {
      let delta = 0;

      left.sort();
      right.sort();

      for (i = 0; i < left.length; i++) {
        const r = right.length > i ? right[i] : 0;
        delta +=  Math.abs(left[i] - r);
      }

      return delta;
  }

  const getSimilarityScore = () => {
    const occurrences = {};
    let total = 0;

    for (i = 0; i < right.length; i++) {
      const v = right[i];
      if (occurrences[v]) {
        occurrences[v]++;
      } else {
        occurrences[v] = 1;
      }
    }

    for (i = 0; i < left.length; i++) {
      const leftVal = left[i];
      const occurencesOfLeft = occurrences[leftVal] ? occurrences[leftVal] : 0;
      total +=  leftVal * occurencesOfLeft;
    }

    return total;
  }

  console.log('Delta: ', getDelta());
  console.log('Similarity: ', getSimilarityScore());
});
