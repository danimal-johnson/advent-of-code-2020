// https://adventofcode.com/2020/day/3
// You're tobogganning down a hill.
// It's infinitely wide and full of trees in a repeating pattern.
// Given a slope, how many trees would you hit on your way to the bottom?
// (Or hopefully just swerve around)


// First: Read the data file contents
fs = require('fs')
let rawData = fs.readFileSync('./aoc2020_03.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});
// Second: Parse the data
// lines = the perpetually-replicating pattern
let lines = (rawData.trim().split('\n'));


const countTrees = function (pattern, slopeX, slopeY) {
  let mountain = [...pattern]; // This copy isn't necessary any longer.
  let currentX = 0;
  let currentY = 0;
  let width = mountain[0].length;
  let height = mountain.length;
  let numTrees = 0;

  while (currentY < height - slopeY) {
    currentX += slopeX;
    currentY += slopeY;

    if (currentX >= width) currentX -= width;
    if (mountain[currentY].charAt(currentX) === '#') numTrees++;
  }
  return numTrees;
}

let part1 = countTrees(lines, 3, 1); //?
let part2 = part1;
part2 *= countTrees(lines, 5, 1); //?
part2 *= countTrees(lines, 1, 1); //?
part2 *= countTrees(lines, 7, 1); //?
part2 *= countTrees(lines, 1, 2); //?
