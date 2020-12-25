// https://adventofcode.com/2020/day/16
// Day 16: Ticket Translation
'use strict';

// ------------------------------------------
// Read the data file contents and parse data
// declare function require(name: string);
const fs = require('fs');

const rules = {
  depLoc:   [33, 224, 230, 954],
  depStn:   [32, 358, 371, 974],
  depPla:   [42, 411, 417, 967],
  depTrk:   [30, 323, 330, 964],
  depDate:  [37, 608, 624, 953],
  depTime:  [43, 838, 848, 954],
  arrLoc:   [40, 104, 111, 955],
  arrStn:   [43, 301, 309, 961],
  arrPla:   [45, 253, 275, 964],
  arrTrk:   [28, 79,  97,  973],
  cls:      [31, 920, 944, 960],
  duration: [35, 664, 676, 951],
  price:    [35, 499, 521, 949],
  route:    [38, 276, 295, 974],
  row:      [38, 582, 599, 950],
  seat:     [31, 646, 657, 953],
  train:    [40, 864, 878, 955],
  type:     [33, 430, 443, 961],
  wagon:    [30, 773, 790, 956],
  zone:     [48, 148, 172, 962]
}

/* ******* Not a very robust approach...
let allRanges = [];
for (let rule in rules) {
  console.log(rules[rule]);
  let ruleList = [...rules[rule]];
  ruleList.forEach(x => allRanges.push(x));
}

let reducedRanges = [];
for (let range of allRanges) {
  if (reducedRanges.length === 0) {
    reducedRanges.push(range);
  }
}
******* */

// ---------------- Gather all the data -------------------
let tests = {};
for(let name in rules) {
  let values = rules[name];
  tests[name] = (x) => {
    return x >= values[0] && x <= values[1] || x >= values[2] && x <= values[3];
  }
}

const myTicket = [
  61,101,131,127,103,191,67,
  181,79,71,113,97,173,59,73,
  137,139,53,193,179
];

const rawData = fs.readFileSync('./aoc2020_16.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

const rawLines: Array<string> = rawData.trim().split('\n');
const tickets: Array<any> = rawLines.map(line => line.split(',').map(Number));


// ---------------- Part 1 -------------------
// Find all invalid numbers (that are outside of all ranges)
// Answer = The sum of all those numbers
let allValues = tickets.flat();
let invalidSum = 0;
let invalidArr = [];

for (let num of allValues) {
  let pass = false;
  for (let test in tests) {
    if (tests[test](num) === true) {
      pass = true;
      break;
    }
  }
  if (pass === false) {
    invalidSum += num;
    invalidArr.push(num);
  }
}
invalidArr.length; //?
console.log(invalidArr);
// Expect 28873
invalidSum;

// --------------------- Part 2 -----------------------
