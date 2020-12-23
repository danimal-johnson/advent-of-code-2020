// https://adventofcode.com/2020/day/15
// Day 15: Rambunctious Recitation
'use strict';

// You have an array of starting numbers
// Elves read them off one at a time

// After the last number, new rules apply:
// (The next number will always be a zero since the start array has no duplicates.)
// If our current number is new, the next number will be zero.
// Otherwise, it will be the number of turns since the last time we saw that number.

// Part 2 is the same as part 1, but with a much higher number of rounds (30 million).
// This solution takes several minutes to solve, despite being an O(n) algorithm
// O(n) space for a hash table (m unique elements x array of 2 nums)
// O(n) time complexity - Parse the list once. Table lookups are O(1).

function playGame(startNums: Array<number>, rounds: number): number {
  // Create a hash table of the last 2 occurrences of each number.
  let ht = {}; // num: [occ1, occ2]
  
  // Process the starting numbers 
  for (let i = 0; i < startNums.length; i++) {
    ht[startNums[i]] = [i];
  }
  let round = startNums.length;
  let currNum = 0;

  // Continue processing numbers for the specified # of rounds.
  while (round < rounds - 1) {
    let nextNum: number;
    if (ht[currNum] === undefined) {
      // The first time we've seen this number
      ht[currNum] = [round];
      nextNum = 0;
    } else {
      // This number has appeared before
      ht[currNum].push(round);
      if (ht[currNum].length === 3) ht[currNum].shift(); // Only store the last 2 positions
      nextNum = ht[currNum][1] - ht[currNum][0];
    }
    
    currNum = nextNum;
    if (round === rounds - 2) {
      return currNum;
    }
    round++;
  }
  throw("Number of rounds calculated incorrectly.");
}

// ---------------------------- Testing -----------------------------
let ex1: Array<number> = [0,3,6]; // 436 (First 10 = 0, 3, 6, 0, 3, 3, 1, 0, 4, 0)
let ex2: Array<number> = [1,3,2]; // 1
let ex3: Array<number> = [2,1,3]; // 10
let ex4: Array<number> = [1,2,3]; // 27
let ex5: Array<number> = [2,3,1]; // 78
let ex6: Array<number> = [3,2,1]; // 438
let ex7: Array<number> = [3,1,2]; // 1836
let input: Array<number> = [5,1,9,18,13,8,0]; // 2020 = 376. 30,000,000 = 323780

// playGame(input, 2020); //?
// playGame(input, 30000000); //?
