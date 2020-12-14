// https://adventofcode.com/2020/day/5
// Boarding passes

// The plane has 127 Rows
// Boarding passes consist of 10 chars with binary formatting
// The first 7 chars indicate row half 'F' (lower) or 'B' (upper)
// The last 3 indicate seat half 'L' (lower) or 'R' (upper)

// Ex: FBFBBFFRLR
// F: Row 0-63  (Front = lower 64 rows)
// B: Row 32-63 (Back = upper 32 rows)
// F: Row 32-47 (lower 16 rows)
// B: Row 40-47 (upper 8 rows)
// B: Row 44-48 (upper 4 rows)
// F: Row 46-48
// F: Row 47
// R: Right half (4-7)
// L: Left half (4-5)
// R: Seat 5

// Also, seat number = row * 8 + column = 357
// BFFFBBFRRR = 1000110111
// This is an overly complicated way of saying "You have a binary number with "

'use strict';

// First: Read the data file contents
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_05.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

let cards = rawData.trim().split('\n');

const seatNumFromLetters = letters => {
  let bin = '';
  for (let i=0; i<letters.length; i++) {
    switch(letters[i]) {
      case 'F':
      case 'L':
        bin += '0';
        break;
      case 'R':
      case 'B':
        bin += '1';
        break;
      default:
        throw('Bad input');
    }
  }
  return parseInt(bin, 2);
}

// --------- Part 1: Find the highest seat number from the boarding cards -----------
const findHighestSeat = seats => {
  let highest = 0;
  seats.forEach(s => {
    if (s > highest) highest = s;
  })
  return highest;
}

let seatNums = cards.map( c => seatNumFromLetters(c));
const high = findHighestSeat(seatNums); //?

// ---------- Part 2: Find your seat. -------------
// Your seat is the only one missing.
// Not all seats in the plane exist and you are not in the first or last seat.

const findLowestSeat = seats => {
  let lowest = seats[0];
  seats.forEach(s => {
    if (s < lowest) lowest = s;
  })
  return lowest;
}

const low = findLowestSeat(seatNums); //?
// const ht = Object.assign({}, ...seatNums.map(s => {s: 'true'})); //?
let ht = {};
seatNums.map (s => ht[s] = true );

for (let i = low; i < high; i++) {
  if (!(i in ht)) console.log(`Seat ${i} is available.`);
}

// An alternate way of creating the hash table.
const hash = Object.assign({}, ...seatNums.map((s => ({[s]: true})))); //?
