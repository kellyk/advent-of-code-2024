const fs = require('fs');

fs.readFile('data/sample.txt', 'utf8', (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const [rulesStr, pagesStr] = input.trim().split('\n\n');
  const rules = rulesStr.split('\n');
  const pages = pagesStr.split('\n');
  console.log({rules, pages});

  const partOne = () => {

    const rulesByPage = {};

    rules.forEach((rule) => {
      const [l, r] = rule.split('|');
      if (!rulesByPage[l]) {
        rulesByPage[l] = [r];
      } else {
        rulesByPage[l].push(r);
      }
    });
    console.log(rulesByPage);


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
