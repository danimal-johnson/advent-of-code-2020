// https://adventofcode.com/2020/day/15
// Day 14: Rambunctious Recitation
'use strict';

// You have an array of starting numbers
// Elves read them off one at a time

// After the last number, new rules apply:
// (The next number will always be a zero since the start array has no duplicates.)
// If our current number is new, the next number will be zero.
// Otherwise, it will be the number of turns since the last time we saw that number.

function part1(startNums: Array<number>, rounds: number): number {
  // Create a hash table of the last 2 occurrences of each number.
  let ht = {}; // num: [occ1, occ2]
  let debug = [...startNums]; // For testing
  
  // Process the starting numbers 
  for (let i = 0; i < startNums.length; i++) {
    ht[startNums[i]] = [i];
  }
  let round = startNums.length;
  let currNum = 0;
  debug.push(currNum);

  // Continue processing numbers for the specified # of rounds.
  while (round < rounds - 1) {
    let nextNum: number;
    if (ht[currNum] === undefined) {
      // The first time we've seen this number
      ht[currNum] = [round];
      nextNum = 0;
    } else {
      ht[currNum].push(round);
      if (ht[currNum].length === 3) ht[currNum].shift(); // Only store the last 2 positions
      nextNum = ht[currNum][1] - ht[currNum][0];
    }
    
    currNum = nextNum;
    debug.push(currNum);
    if (round === rounds - 2) {
      // console.log(debug);
      return currNum;
    }
    round++;
  }
  throw("Number of rounds calculated incorrectly.");
}

// ---------------------------- Testing -----------------------------
// Expect 436
// (First 10 = 0, 3, 6, 0, 3, 3, 1, 0, 4, 0)
let ex1: Array<number> = [0,3,6];

// Expect 1
let ex2: Array<number> = [1,3,2];

// Expect 10
let ex3: Array<number> = [2,1,3];

// Expect 27
let ex4: Array<number> = [1,2,3];

// Expect 78
let ex5: Array<number> = [2,3,1];

// Expect 438
let ex6: Array<number> = [3,2,1];

// Expect 1836
let ex7: Array<number> = [3,1,2];

// Expect 376
let input: Array<number> = [5,1,9,18,13,8,0];
part1(input, 2020); //?