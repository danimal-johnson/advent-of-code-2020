// https://adventofcode.com/2020/day/12
// Day 12: Rain risk
'use strict';

// ------------------------------------------
// Read the data file contents and parse data
declare function require(name: string);
const fs = require('fs');

const rawData = fs.readFileSync('./aoc2020_12.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

let lines: Array<string> = rawData.trim().split('\n');
let instructions = lines.map(x => {
  return {
    cmd: x[0],
    val: parseInt(x.slice(1))
  }
})



let testData = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11'
];
let testInst = testData.map(x => {
  return {
    cmd: x[0],
    val: parseInt(x.slice(1))
  }
})

testInst;


// --------------------------------------------
// Part 1:
// Ships move N, S, E, W, and F (Forward)
// Rotations happen with R and L commands (in degrees)
// You start at 0,0 facing east.

function manhattanDist (inst: Array<any>): number {
  let currentX: number = 0;
  let currentY: number = 0;
  let currentDir: string = 'E';
  const cwOrder: Array<string> = ['N', 'E', 'S', 'W'];
  let idx = 1; // Index of 'E' in cwOrder (used for calc in switch statement)

  for (let i of inst) {
    let currCmd = i.cmd;
    if (currCmd === 'F') currCmd = currentDir;
    let rotations = 0; 
    switch (currCmd) {
      case 'N':
        currentY += i.val;
        break;
      case 'S':
        currentY -= i.val;
        break;
      case 'E':
        currentX += i.val;
        break;
      case 'W':
        currentX -= i.val;
        break;
      case 'L':
        rotations = i.val / 90;
        idx = cwOrder.findIndex(x => x === currentDir);
        if (idx === -1) console.log(currentDir);
        for (let t=0; t<rotations; t++) {
          idx --;
          if (idx === -1) idx += cwOrder.length;
        }
        idx %= cwOrder.length;
        currentDir = cwOrder[idx];
        break;        
      case 'R':
        rotations = i.val / 90;
        idx = cwOrder.findIndex(x => x === currentDir);
        if (idx === -1) console.log(currentDir);
        idx += rotations;
        idx %= cwOrder.length;
        currentDir = cwOrder[idx];
        break;
      default:
        console.error(`Unknown command ${i}`);
    }
  }
  
  return Math.abs(currentX) + Math.abs(currentY);
} 

// Expected 25
// manhattanDist(testInst); //?
// Expected 1186
manhattanDist(instructions); //?
