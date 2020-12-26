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
  }
}
// Expect 28873
invalidSum;

// --------------------- Part 2 -----------------------
// Eliminate all the invalid tickets from the list.
// From the remaining tickets, work out which field is which
// Note: We only need the 6 departure fields for the answer.

for (let ticket of tickets) {
  for (let num of ticket) {
    let pass = false;
    for (let test in tests) {
      if (tests[test](num) === true) {
        pass = true;
        break;
      }
    }
    if (pass === false) {
      // Mark the ticket as bad
      ticket.unshift(null);
      break;
    }
  }
}
// Remove the marked tickets
let validTickets = tickets.filter(t => t[0] !== null);
const numTickets = validTickets.length; //?
const numFields = validTickets[0].length; //?
let fieldCounts = {
  depLoc  : new Array(numFields).fill(0),
  depPla  : new Array(numFields).fill(0),
  depStn  : new Array(numFields).fill(0),
  depTrk  : new Array(numFields).fill(0),
  depDate : new Array(numFields).fill(0),
  depTime : new Array(numFields).fill(0)
};

let fieldMatches = {
  depLoc  : [],
  depPla  : [],
  depStn  : [],
  depTrk  : [],
  depDate : [],
  depTime : []
}

for (let ticket of validTickets) {
  for (let i = 0; i < numFields; i++) {
    fieldCounts["depLoc"][i] += tests["depLoc"](ticket[i]) ? 1 : 0; 
    fieldCounts["depPla"][i] += tests["depPla"](ticket[i]) ? 1 : 0; 
    fieldCounts["depStn"][i] += tests["depStn"](ticket[i]) ? 1 : 0; 
    fieldCounts["depTrk"][i] += tests["depTrk"](ticket[i]) ? 1 : 0; 
    fieldCounts["depDate"][i] += tests["depDate"](ticket[i]) ? 1 : 0; 
    fieldCounts["depTime"][i] += tests["depTime"](ticket[i]) ? 1 : 0;
  }  
}

for (let field in fieldCounts) {
  console.log(field);
  for (let i = 0; i < numFields; i++) {
    fieldCounts[field]; //?
    if (fieldCounts[field][i] === numTickets) {
      fieldMatches[field].push(i);
    }
  }
}
console.log(fieldMatches);

let colPossible = {};

for (let field in fieldMatches) {
  for (let i = 0; i < fieldMatches[field].length; i++) {
    let currentVal = fieldMatches[field][i];
    if (colPossible[currentVal] === undefined) {
      colPossible[currentVal] = [field]
    } else {
      colPossible[currentVal].push(field);
    }
  }
}

console.log(colPossible);
// for (let col in colPossible) {
//   if 
// }

// The first 5 fields:
console.log(myTicket[0],myTicket[1], myTicket[5], myTicket[9], myTicket[12])
let m = myTicket[0] * myTicket[1] * myTicket[5] * myTicket[9] * myTicket[12];

// The 6th field is in here somewhere:
console.log(myTicket[6], myTicket[7], myTicket[10], myTicket[11], myTicket[16], myTicket[19] );
console.log(m * myTicket[6], m * myTicket[7], m * myTicket[10], m * myTicket[11], m * myTicket[16], m * myTicket[19] );
// By trial and error, the hidden mystery field "depLoc" is column 19 (179 on my ticket).
// That makes the puzzle answer 2587271823407
// So why did columns 6, 7, 10, 11, and 16 also show up as false possibilities?

// A possible fix: test ALL the fields. We should then be able to sort appropriately and eliminate ambiguities.