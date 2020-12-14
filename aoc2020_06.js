// https://adventofcode.com/2020/day/5
// Customs

'use strict';

// First: Read the data file contents
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_06.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

let rawForms = rawData.trim().split('\n\n');

// ------ Part 1: Find the sum of the unique letters in each group and add together. -------

const countUniqueLetters = rawForm => {
  let formPieces = rawForm.split('\n');
  let form = '';
  formPieces.forEach( p => form += p );
  
  let unique = new Set();
  for (let i=0; i<form.length; i++) {
    unique.add(form[i]);
  }
  return unique.size;
}

const countAllYesAnswers = rawForms => {
  let count = 0;
  for (let form of rawForms) {
    count += countUniqueLetters(form);
  }

  return count;
}

countAllYesAnswers(rawForms); //?

// ------- Part 2: Count all the letters that appear on every line in each block ---------

const countMatchingLetters = rawForm => {
  let entries = rawForm.split('\n');
  const numEntries = entries.length; //?
  let count = 0;
  let ht = {};

  for (let entry of entries) {
    for (let i=0; i<entry.length; i++) {
      if (entry[i] in ht) ht[entry[i]]++;
      else ht[entry[i]] = 1;
    }
  }
  
  for (let letter in ht) {
    if (ht[letter] === numEntries) count++;
  }

  return count;
}

const getMatchingTotal = rawForms => {
  let count = 0;
  for (let form of rawForms) {
    count += countMatchingLetters(form);
  }
  return count;
}

getMatchingTotal(rawForms); //?

// An alternative way to get the final answer without creating the getMatchingTotal() function.
let answer = rawForms.reduce((acc, val) => {
  return acc + countMatchingLetters(val);
}, 0)
answer; //?
