// https://adventofcode.com/2020/day/9
// Encoding Error
'use strict';


// Part 1: 
// Input is an array of numbers
// The first 25 are a preamble.
// The next number must be a sum of any 2 numbers before it.
// What is the first number that fails the test?

// Read the data file contents and parse data
declare function require(name: string);
const fs = require('fs');

const rawData = fs.readFileSync('./aoc2020_09.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

const data: Array<number> = rawData.trim().split('\n').map(d => parseInt(d));
let preambleHash = {};

function matchAtIndex(value: number, preamble: Array<number>): Boolean {
  preambleHash; //?
  for (let i = 0; i < preamble.length; i++) {
    let complement = value - preamble[i];
    if (preambleHash[complement] != undefined && preambleHash[complement] > 0) {
      // Duplicate scenario:
      if (complement === value / 2 && preambleHash[complement] < 2) continue;
      return true;
    }
  }
  return false;
}

function checkAllNumbers (input: Array<number>, preambleLength: number): string {
  // Create initial preamble table
  preambleHash = {};
  for (let i = 0; i < preambleLength; i++) {
    preambleHash[input[i]] = 1 + ( preambleHash[input[i]] ?? 0);
  }

  for (let i = preambleLength; i < input.length; i++) {
    if (!matchAtIndex(input[i], input.slice(i-preambleLength, i))) return `Found anomaly at position ${i}: ${input[i]}`; //?

    if (preambleHash[input[i-preambleLength]] === undefined) throw(`This shouldn't have happened.`);

    preambleHash[input[i-preambleLength]] = preambleHash[input[i-preambleLength]] - 1; // Remove first element from hash.
    preambleHash[input[i]] = 1 + ( preambleHash[input[i]] ?? 0); // Add current element to hash.
  }
  return `All encoding is valid.`;
}

const testInput = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

// checkAllNumbers(testInput, 5); //?
checkAllNumbers(data, 25); //? 

// Part 2: Find the "encryption weakness"
// 1) Find the range of numbers in the input array that add up to the anomaly from Part 1.
// 2) Of that group, find the minimum and maximum numbers.
// 3) Add those two numbers together for the result.


function contigSumInArray(target: number, blockLength: number, input: Array<number>) {
  if (blockLength > input.length) throw('Attempting to sum an oversized block, you blockhead.');
  let lowIndex = 0;
  let highIndex = blockLength - 1;
  let sum: number = input.slice(lowIndex, highIndex + 1).reduce((a, b) => a + b, 0);
  if (sum === target) return [lowIndex, highIndex];
  
  while (highIndex < input.length)
  {
    sum -= input[lowIndex];
    lowIndex++;
    highIndex++;
    sum += input[highIndex];
    if (sum === target) {
      blockLength; //?
      lowIndex
      highIndex

      let resultArr = input.slice(lowIndex, highIndex + 1)
      let low = Math.min(...resultArr);
      let high = Math.max(...resultArr);

      console.log(`${low} + ${high} = ${low + high}`);
      return [low, high];
    }
  }

  return [null, null];
}

function findContiguousSet (target: number, input: Array<number>): Array<number> {
  const targetIndex = input.indexOf(target);

  for (let blockSize = 2; blockSize < input.length; blockSize++) {
    let result = contigSumInArray(target, blockSize, input);
    if (result[0] !== null) return result;
  }

  return [null, null];
}

// findContiguousSet(127, testInput); //?
// contigSumInArray(127, 4, testInput); //?
// findContiguousSet(51, data); //?
findContiguousSet(373803594, data); //?
