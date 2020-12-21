// https://adventofcode.com/2020/day/14
// Day 14: Docking Data
'use strict';

// ------------------------------------------
// Read the data file contents and parse data
declare function require(name: string);
const fs = require('fs');

const rawData = fs.readFileSync('./aoc2020_14.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

let rawLines: Array<string> = rawData.trim().split('\n');
let commands: Array<any> = rawLines.map(l => {
  let ins = l.split(' = ');
  return {
    cmd: ins[0].replace('mem[', '').replace(']', ''),
    val: ins[1]
  }
});

let testData = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0'
];
let testCmds: Array<any> = testData.map(l => {
  let ins = l.split(' = ');
  return {
    cmd: ins[0].replace('mem[', '').replace(']', ''),
    val: ins[1]
  }
}); //?

// --------------------------------------------
// Part 1:
// You have a memory bank with addresses and values and a mask.
// You have an instruction set consisting of mask updates and memory values.
// The current mask replaces bits at any position not indicated by an 'X'
// Find the sum of all values in memory after the program runs.

function part1 (instructions: Array<any>): number {
  let mask: string = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  let memory = {};
  instructions.forEach(i => {
    if (i.cmd === 'mask') mask = i.val;
    else {
      let result: Array<string> = new Array(mask.length);
      let binArr: Array<string> = parseInt(i.val).toString(2).split(''); //?
      while (binArr.length < mask.length) {
        binArr.unshift('0');
      }
      for(let j=0; j<mask.length; j++) {
        result[j] = mask.charAt(j) === 'X' ? binArr[j] : mask.charAt(j);
      }

      // console.log(binArr.join(''));
      // console.log(parseInt(result.join(''),2));
      memory[i.cmd] = parseInt(result.join(''), 2);
    }
  })
  
  let v: Array<number> = Object.values(memory); //?

  return v.reduce((sum, num) => sum + num);
}

// Expect 165
// part1(testCmds); //?
// Expect 8471403462063
// part1(commands); //?

// --------------------------------------------
// Part 2:
// Now the mask modifies the addresses instead of the values.
// '0' bits are unchanged. '1' bits become 1. 'X' bits are floating...
// 

let testData2 = [
'mask = 000000000000000000000000000000X1001X',
'mem[42] = 100',
'mask = 00000000000000000000000000000000X0XX',
'mem[26] = 1',
];

let testCmds2: Array<any> = testData2.map(l => {
  let ins = l.split(' = ');
  return {
    cmd: ins[0].replace('mem[', '').replace(']', ''),
    val: ins[1]
  }
});

function part2 (instructions: Array<any>): number {
  let mask: string = '000000000000000000000000000000000000';
  let memory = {};
  instructions.forEach(i => {
    if (i.cmd === 'mask') mask = i.val;
    else {
      let result: Array<string> = new Array(mask.length);
      let binArr: Array<string> = parseInt(i.cmd).toString(2).split('');
      while (binArr.length < mask.length) {
        binArr.unshift('0');
      }
      for(let j=0; j<mask.length; j++) {
        result[j] = mask.charAt(j) === '0' ? binArr[j] : mask.charAt(j);
      }
      sub2(result, parseInt(i.val), memory)
    }
  });
    
  let v: Array<number> = Object.values(memory);
  return v.reduce((sum, num) => sum + num);
}

function sub2 (addrMask: Array<string>, value: number, memory: Object ): void {
  let floatPosition = addrMask.indexOf('X');
  if (floatPosition === -1) {
    memory[parseInt(addrMask.join(''), 2)] = value;
    return;
  }
  let maskCopy = [...addrMask];
  maskCopy[floatPosition] = '0';
  sub2(maskCopy, value, memory);
  maskCopy[floatPosition] = '1';
  sub2(maskCopy, value, memory);
  return;
}

// Expect 208
// part2(testCmds2); //?
// Expect 2667858637669
// part2(commands); //?