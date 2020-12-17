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
// People will sit down if no one is sitting in an adjacent seat.
// People will stand if too many people (4 or more) sit nearby.
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
    adj: Array<Array<number>>,
    vis: Array<Array<number>>,
    maxNearby: number,
    adjOnly: boolean): number {
  let numChanges = 0;
  for (let r = 0; r < occ.length; r++) {
    for (let c = 0; c < occ[0].length; c++) {
      if (adjOnly && occ[r][c] === 0 && adj[r][c] === 0) {
        // Take a seat if it's not too crowded
        occ[r][c] = 1;
        numChanges++;
      } else if (!adjOnly && occ[r][c] === 0 && vis[r][c] === 0) {
        // Take a seat if it's not too crowded
        occ[r][c] = 1;
        numChanges++;
      } else if (adjOnly && occ[r][c] === 1 && adj[r][c] >= maxNearby) {
        // Vacate the seat if too many adjacent seats are occupied
        occ[r][c] = 0;
        numChanges++;
      } else if (!adjOnly && occ[r][c] === 1 && vis[r][c] >= maxNearby) {
        // Vacate the seat if we can see too many people
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
    numChanges += updateOccSeats(occMatrix, adjMatrix, null, 4, true);
  } while (numChanges != 0);

  let seatsOccupied = 0;
  for (let row of occMatrix) {
    seatsOccupied += row.reduce((total, num) => total + num);
  }
  return seatsOccupied;
}
// Expect 37:
// finalSeatsOccupied(testOcc); //?
// Expect 2406:
// finalSeatsOccupied(occupied); //?


// --------------------------------------------
// Part 2:
// People are now willing to sit until 5 or more people sit nearby.
// "Nearby" now means line of sight of any other seat (8 directions)
// People will still sit as long as the adjacent seats are empty.
// Updates all seats in adjacency matrix (mutates) using occupancy matrix (not modified)
// * I mistook this to mean look across the entire grid in each direction.
// * The actual requirement is to only look across aisles and stop at the nearest empty chair.


function getSeatVisCount (
  occ: Array<Array<number>>,
  row: number,
  col: number): number {

  let total = 0;
  let height = occ.length;
  let width = occ[0].length;

  // Up
  let r = row - 1;
  let c = col;
  while (r > -1) {
    if (occ[r][c] === 0) break;
    if (occ[r][c] === 1) {
      total++;
      break;
    }
    r--;
  }
  // Down
  r = row + 1;
  while (r < height) {
    if (occ[r][c] === 0) break;
    if (occ[r][c] === 1) {
      total++;
      break;
    }
    r++;
  }
  // Left
  r=row;
  c=col - 1;
  while (c > -1) {
    if (occ[r][c] === 0) break;
    if (occ[r][c] === 1) {
      total++;
      break;
    }
    c--;
  }
  // Right
  c = col + 1;
  while (c < width) {
    if (occ[r][c] === 0) break;
    if (occ[r][c] === 1) {
      total++;
      break;
    }
    c++;
  }
// Up-Left
r = row - 1;
c = col - 1;
while (r > -1 && c > -1) {
  if (occ[r][c] === 0) break;
  if (occ[r][c] === 1) {
    total++;
    break;
  }
  r--;
  c--;
}
// Up-Right
r = row - 1;
c = col + 1;
while (r > -1 && c < width) {
  if (occ[r][c] === 0) break;
  if (occ[r][c] === 1) {
    total++;
    break;
  }
  r--;
  c++;
}
// Down-Left
r = row + 1;
c = col - 1;
while (r < height && c > -1) {
  if (occ[r][c] === 0) break;
  if (occ[r][c] === 1) {
    total++;
    break;
  }
  r++;
  c--;
}
// Down-Right
r = row + 1;
c = col + 1;
while (r < height && c < width) {
  if (occ[r][c] === 0) break;
  if (occ[r][c] === 1) {
    total++;
    break;
  }
  r++;
  c++;
}
  return total;
}

function updateVisSeats (
  occupied: Array<Array<number>>,
  visible: Array<Array<number>>): void {

  for (let row = 0; row < occupied.length; row++) {
    for (let col = 0; col < occupied[0].length; col++) {
      visible[row][col] = getSeatVisCount(occupied, row, col);
    }  // For each column
  } // For each row
}

function finalSeatsWithVisibility (occMatrix: Array<Array<number>>): number {
  let numChanges = 0;
  let prevChanges = 0;
  // # of seats adjacent to each position
  let adjMatrix: Array<Array<number>> = [];
  for (let i = 0; i < occMatrix.length; i++) {
    adjMatrix.push(new Array(occMatrix[0].length).fill(0));
  }
  // # of seats visible from current position
  let visMatrix: Array<Array<number>> = [];
  for (let i = 0; i < occMatrix.length; i++) {
    visMatrix.push(new Array(occMatrix[0].length).fill(0));
  }

  // Main loop: run until chaos settles down.
  let pass = 0;
  do {
    // Count this way in case an equal number of people stand and sit.
    prevChanges = numChanges;
    numChanges = 0;
    updateAdjSeats(occMatrix, adjMatrix);
    updateVisSeats(occMatrix, visMatrix);
    numChanges += updateOccSeats(occMatrix, adjMatrix, visMatrix, 5, false);
  } while (numChanges != prevChanges);

  // Return number of seats occupied.
  let seatsOccupied = 0;
  for (let row of occMatrix) {
    seatsOccupied += row.reduce((total, num) => total + num);
  }
  return seatsOccupied;
}

function printSeats(seatMatrix: Array<Array<number>>): void {
  let str = '';
  for (let row of seatMatrix) {
    str += row.map(x => {
      if (x === 0) return 'L';
      if (x === 1) return '#';
      if (x === null) return '.';
    }).join('');
    str += '\n';
  }
  str.trim();
  console.log(str);
} 

// Expect 26
// finalSeatsWithVisibility(testOcc); //?
// Expect 2149
// finalSeatsWithVisibility(occupied); //?