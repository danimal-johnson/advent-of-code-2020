// https://adventofcode.com/2020/day/4
// Passport field checking.

// Side note: A good site for learning regex is regexr.com
// Also: javascript.info has excellent explanations/examples of objects, arrays, maps, keys, values, etc.

// First: Read the data file contents
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_04.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});
// Second: Parse the data
// Each passport is separated by a blank line.
let rawPassports = (rawData.trim().split('\n\n'));
let passports = [];

for (passport of rawPassports) {
  let ppFields = passport.replace(/\n/g, ' ').split(/\s+/);
  // let ppFields = passport.split(' ');
  let ppObject = {};
  for (let field of ppFields) {
    let pairs = field.split(':');
    ppObject[pairs[0]] = pairs[1];
}
passports.push(ppObject);
}

const validityCheck = (passport) => {
  // Part 1: Check that all mandatory fields exist (Answer = 250)
  const mandatoryFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  for (field of mandatoryFields) {
    if (!(field in passport)) {
      return false;
    }
  }
  // Part 2: Scrutinize each field (Answer = 158)
  if (parseInt(passport['byr']) < 1920 || parseInt(passport['byr']) > 2002) return false;
  if (parseInt(passport['iyr']) < 2010 || parseInt(passport['iyr']) > 2020) return false;
  if (parseInt(passport['eyr']) < 2020 || parseInt(passport['eyr']) > 2030) return false;
  if (!(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport['ecl']))) return false;
  if (passport['hcl'].search(/^#[0-9,a-f]{6}$/) !== 0) return false;
  if (passport['pid'].search(/^\d{9}$/) !== 0) return false;

  const height = parseInt(passport['hgt']);
  switch(passport['hgt'].slice(-2)) {
    case 'cm':
      if (height < 150 || height > 193) return false;
      break;
    case 'in':
      if (height < 59 || height > 76) return false;
      break;
    default:
      return false;
  }

  return true;
}
const processPassports = (passports) => {
  let validCount = 0;
  for (let pp of passports) {
    const numFields = Object.keys(pp).length;
    if (numFields === 7 || numFields === 8) validCount += validityCheck(pp) ? 1 : 0;
  }
  return validCount;
}

processPassports(passports); //?
