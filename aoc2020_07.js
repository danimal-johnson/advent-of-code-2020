// https://adventofcode.com/2020/day/7
// Handy Haversacks
'use strict';

// Read the data file contents and parse data
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_07.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

// Create a hash table of rules in the format of
// {bagtype: {innerbag: quantity, ...}}
const rawRules = rawData.trim().split('\n');
let rules = {};

for (let rule of rawRules) {
  // let rule = "dark olive bags contain 3 faded blue bags, 4 dotted black bags."
  let ruleTweak = rule
    .replace('contain', ',')
    .replace(/(bag)s?/g, '') // Why doesn't the "word" rule \w work here?
    .replace('.', '');
  let ruleArr = ruleTweak.split(',');
  let ruleName = ruleArr.shift().trim();
  let ruleProps = new Object();
  for (let r of ruleArr) {
    let num = parseInt(r);
    let str = r.replace(/\d+/, '').trim();
    if (str === 'no other') continue;
    ruleProps[str] = num;
  }
  rules[ruleName] = ruleProps;
}

// Create a reverse lookup table from our rules object:
// {bagtype: [outerBag1, outerBag2, outerBag3]}
let containedBy = {};
for (let outerBag in rules) {
  for (let innerBag of Object.keys(rules[outerBag])) {
    if (innerBag in containedBy) {
      containedBy[innerBag].push(outerBag);
    } else {
      containedBy[innerBag] = [outerBag];
    }
  }
}

// Part 1: How many bag colors can eventually contain at least one shiny gold bag?
const myBag = 'shiny gold';
let outerBags = [];
let followed = {};

const checkBag = bag => {
  if (!containedBy[bag]) { // No additional bags contain this bag
    followed[bag] = true;
    outerBags.push(bag);
    return;
  }
  let containerList = Array.from(containedBy[bag]);
  for (let b of containerList) {
    if (followed[b] === true) { // We've already checked this bag. Next.
      continue;
    } else {  // A new bag type to check:
      followed[bag] = true; // Mark our current bag as followed (to avoid an infinite loop)
      checkBag(b);
    }
  }
  outerBags.push(bag);
  followed[bag] = true;
}

checkBag(myBag);

// Every bag type we look at is a valid outer bag.
// So we could use either the outerBags length or the followed nodes length.
Object.keys(followed).length; //?
outerBags.length; //?
// Our result contains our original entry 'shiny gold' that must be removed, so subtract 1
// Answer = 128

// -------------------- Part 2 ---------------------------
// Each bag type contains ALL the bags as listed in the rules, nested like Russian dolls.
// How many bags are inside the original shiny gold bag?

const countInnerBags = bag => {
  let bagCount = 0;
  const myBags = rules[bag];
  if (Object.entries(myBags).length === 0) return 0; // No nested bags
  for ( let bagType in myBags ) {
    let multiplier = myBags[bagType];
    bagCount += (multiplier * countInnerBags(bagType));
    bagCount += multiplier; // Don't forget to add the current bags back in!
  }
  return bagCount;
}

countInnerBags(myBag) //?
// Answer = 20189