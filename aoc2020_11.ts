// https://adventofcode.com/2020/day/11
// Day 11: Seating System
'use strict';

// ------------------------------------------
// Read the data file contents and parse data
declare function require(name: string);
const fs = require('fs');

const rawData = fs.readFileSync('./aoc2020_11.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

let seatRows: Array<string> = rawData.trim().split('\n');
let occupied: Array<Array<number>> = seatRows.map(str => str.split('').map(s => {
  if (s === '.') return null;
  if (s === 'L') return 0;
  if (s === '#') return 1;
}));

let testOccRows = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

let testOcc: Array<Array<number>> = testOccRows.map(str => str.split('').map(s => {
  if (s === '.') return null;
  if (s === 'L') return 0;
  if (s === '#') return 1;
}));

// --------------------------------------------
// Part 1:
// Given an array of empty seats.
// People will sit down if they won't be surrounded by too many people.
// People will stand if too many people sit nearby.
// The room will eventually reach equilibrium.
// When it does, how many seats are filled?



// Updates all seats in adjacency matrix (mutates) using occupancy matrix (not modified)
function updateAdjSeats (
    occ: Array<Array<number>>,
    adj: Array<Array<number>>): void {
  
  for (let r = 0; r < occ.length; r++) {
    for (let c = 0; c < occ[0].length; c++) {
      adj[r][c] = 0;
      adj[r][c] += occ[r][c-1] ?? 0; // Left
      adj[r][c] += occ[r][c+1] ?? 0; // Right
      
      if (r > 0) { // Skip if top row
        adj[r][c] += occ[r-1][c] ?? 0; // Up
        adj[r][c] += occ[r-1][c-1] ?? 0; // Up-Left
        adj[r][c] += occ[r-1][c+1] ?? 0; // Up-Right
      }
      if (r < occ.length - 1) { // Skip if bottom row
        adj[r][c] += occ[r+1][c] ?? 0; // Down
        adj[r][c] += occ[r+1][c-1] ?? 0; // Down-Left
        adj[r][c] += occ[r+1][c+1] ?? 0; // Down-Right
      }
    }  // For each column
  } // For each row
}

// Updates all seats in occupied matrix (mutates) using adjacency matrix (not modified)
function updateOccSeats (
    occ: Array<Array<number>>,
    adj: Array<Array<number>>): number {
  let numChanges = 0;
  for (let r = 0; r < occ.length; r++) {
    for (let c = 0; c < occ[0].length; c++) {
      if (occ[r][c] === 0 && adj[r][c] === 0) {
        // Take a seat if it's not too crowded
        occ[r][c] = 1;
        numChanges++;
      } else if (occ[r][c] === 1 && adj[r][c] >= 4) {
        // Vacate the seat if it is
        occ[r][c] = 0;
        numChanges++;
      }
    }
  }
  return numChanges;
}

function finalSeatsOccupied (occMatrix: Array<Array<number>>): number {
  let numChanges = 0;
  // FIXED: The next [evil] lines fill each row with the SAME array. (Change one value, change 'em all.)
  // let adjMatrix: Array<any> = new Array(occMatrix.length);
  // adjMatrix.fill(new Array(occMatrix[0].length).fill(0));

  let adjMatrix: Array<Array<number>> = [];
  for (let i = 0; i < occMatrix.length; i++) {
    adjMatrix.push(new Array(occMatrix[0].length).fill(0))
  }
  do {
    numChanges = 0;
    updateAdjSeats(occMatrix, adjMatrix);
    numChanges += updateOccSeats(occMatrix, adjMatrix);
  } while (numChanges != 0);

  let seatsOccupied = 0;
  for (let row of occMatrix) {
    seatsOccupied += row.reduce((total, num) => total + num);
  }
  return seatsOccupied;
}
// Expect 37:
finalSeatsOccupied(testOcc); //?
// Expect 2406:
// finalSeatsOccupied(occupied); //?


// --------------------------------------------
// Part 2:



