// https://adventofcode.com/2020/day/12
// Day 12: Rain risk (part 2)
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
// Similar to part 1, but waypoint oriented.
// Ship starts at [0,0]. Direction no longer relevant.
// Waypoint starts at [10,1] and is always relative to ship.
// N, S, E, W move the *waypoint* by a given value.
// R & L rotate the waypoint around the ship
// F moves the ship in the direction of the waypoint multiplied by its value.

function manhattanDist (inst: Array<any>): number {
  let shipX: number = 0;
  let shipY: number = 0;
  let waypointX = 10;
  let waypointY = 1;
  
  const cwOrder: Array<string> = ['N', 'E', 'S', 'W'];
  let idx = 1; // Index of 'E' in cwOrder (used for calc in switch statement)

  for (let i of inst) {
    let rotations = 0; 
    switch (i.cmd) {
      case 'F':
        shipX += waypointX * i.val;
        shipY += waypointY * i.val;
        break;
      case 'N':
        waypointY += i.val;
        break;
      case 'S':
        waypointY -= i.val;
        break;
      case 'E':
        waypointX += i.val;
        break;
      case 'W':
        waypointX -= i.val;
        break;
      case 'L':
        rotations = i.val / 90;
        for(let t=0; t<rotations; t++) {
          // y becomes x; x becomes -y
          let temp = waypointY;
          waypointY = waypointX;
          waypointX = 0 - temp;
        }
        break;        
      case 'R':
        rotations = i.val / 90;
        for(let t=0; t<rotations; t++) {
          // y becomes -x; x becomes y
          let temp = waypointY;
          waypointY = 0 - waypointX;
          waypointX = temp;
        }
        break;
      default:
        console.error(`Unknown command ${i}`);
    }
    // console.log(`[${waypointX}][${waypointY}]`)
    // console.log(`[${shipX}][${shipY}]`)
  }
  shipX;
  shipY;
  return Math.abs(shipX) + Math.abs(shipY);
} 

// Expected 286 (214 + 72)
manhattanDist(testInst); //?
// Expected < 47806
manhattanDist(instructions); //?
