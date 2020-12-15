// https://adventofcode.com/2020/day/10
// Day 10: Adapter Array
'use strict';

// ------------------------------------------
// Read the data file contents and parse data
declare function require(name: string);
const fs = require('fs');

const rawData = fs.readFileSync('./aoc2020_10.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

const data: Array<number> = rawData.trim().split('\n').map(x => parseInt(x)).sort((a,b) => a - b);

// --------------------------------------------
// Part 1:
// Input is an array of numbers in "jolts".
// Count the number of 1-jolt differences (x)
// Count the number of 3-jolt differences (y)
// Return x*y

let sampleData: Array<number> = [
  28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38,
  39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3
].sort((a,b) => a - b)

function part1 (joltArr: Array<number>): number {
  // Apparently, the problem is including the first numbers as a unique difference:
  let oneJolt: number = 1;
  let threeJolt: number = 1;

  for (let i = 0; i < joltArr.length - 1; i++) {
    if (joltArr[i+1] === joltArr[i] + 1) oneJolt++;
    if (joltArr[i+1] === joltArr[i] + 3) threeJolt++;
  }
  
  console.log(`${oneJolt} * ${threeJolt} = ${oneJolt * threeJolt}`)
  return oneJolt * threeJolt;
}
// part1(sampleData); //?
part1(data); //?

// ------------------------------------------------------------------------
// Part 2: Count the total number of valid arrangements to power the device.
// Not every adapter has to be used in each arrangement.

let sampleData2: Array<number> = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4].sort((a,b) => a - b); // Output should be 8
sampleData2; //?

// Using dynamic programming: Try all combinations recursively with memoization.
function part2 (adapters: Array<number>): number {
  let hash = {};
  // Prepend our starting voltage of zero in case the first adapter is optional.
  let copy: Array<number> = [0, ...adapters]; 
  let result = subset(copy, 0, hash); //?
  return result;
}

function subset (adapters: Array<number>, index: number, hash: {}): number {
  // We've reached the end of the adapter list
  if (index === adapters.length - 1) return 1;
  // We've already calculated all the subsets for this adapter.
  if (index in hash) return hash[index];

  let result = 0; 
  for (let i = index + 1; i < adapters.length; i++ ) {
    if (adapters[i] - adapters[index] <= 3 ) { // All combinations where the next adapter's joltage isn't too high.
      result += subset(adapters, i, hash);
    }
  }
  hash[index] = result;
  return result;
}
// sampleData should return 19208
// part2(sampleData); //?
// SampleData2 should return 8
// part2(sampleData2); //?
part2(data); //?