// https://adventofcode.com/2020/day/2

// How many passwords in the file are valid?
// File format: "a-b p: iiiiiiii..."
// a=min, b=max, p=pattern, iiiiiiii... = input to test

// First, read the password file:
// Note: it needs to be read asynchronously or in a promise.
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_02.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

// Next, parse the data
// Note: remember to trim() the newlines at the end of the file.
let parsedData = [];
let lines = (rawData.trim().split('\n'));

for (let i=0; i<lines.length; i++) {
  let testString = lines[i];
  let test = testString.split(' ');
  let range = test[0].split('-');
  let pattern = String(test[1]).charAt(0);
  let password = test[2];
  parsedData.push({ min: parseInt(range[0]), max: parseInt(range[1]), pattern, password });
}

// Part 1: file is described as above

const checkPassword = function (item) {
  const { min, max, pattern, password } = item;
  let count = 0;
  // Currently, patterns are 1 character long.
  for (let i = 0; i < password.length; i++) {
    if (password[i] === pattern) {
      count++;
    }
  }
  return (min <= count && count <= max) ? true : false;
}

const checkAllPasswords = function(items, cb) {
  let count = 0;
  for (item of items) {
    if (cb(item)) count++;
  }
  return count;
}

checkAllPasswords(parsedData, checkPassword); //?

// Part 2: Same file, but the fields have changed meaning
// File format: "a-b p: iiiiiiii..."
// a = position 1, b = position 2, p=pattern, iiiiiiii... = input to test

const checkPassword2 = function (item) {
  // Repurposing min and max as 1-based positions in the password string.
  const { min, max, pattern, password } = item;
  if (password.charAt(min-1) === pattern && password.charAt(max-1) !== pattern ) return true;
  if (password.charAt(max-1) === pattern && password.charAt(min-1) !== pattern ) return true;
  return false;
}

checkAllPasswords(parsedData, checkPassword2); //?