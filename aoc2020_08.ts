// https://adventofcode.com/2020/day/8
// Handheld Halting
'use strict';

// Read the data file contents and parse data
// fs = require('fs')
declare function require(name: string);
const fs = require('fs');

// Read the file
const rawData = fs.readFileSync('./aoc2020_08.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('Error:', err);
  }
});

// Parse the data
// Result is the array 'instructions[{operand, value},...]'
const rawInstructions = rawData.trim().split('\n');
type ValidIns = 'nop' | 'acc' | 'jmp';
interface Instruction {operand: ValidIns, value: number};
let originalCode: Array<Instruction> = [];
rawInstructions.forEach( ins => {
  let i = ins.split(' ');
  originalCode.push({operand: i[0], value: parseInt(i[1])});
})

function runProgram (instructions: Array<Instruction>): string {
  let exePointer: number = 0;
  let accum: number = 0;
  let loopDetector = {string: Boolean};
  let currentIns: Instruction;

  while (!(exePointer in loopDetector) && exePointer < instructions.length) {
    currentIns = instructions[exePointer];
    loopDetector[exePointer] = true;
    switch(currentIns.operand) {
      case 'jmp':
        exePointer += currentIns.value;
        break;
      case 'acc':
        accum += currentIns.value;
        // fall through
      case 'nop':
        exePointer += 1;
        break;
      default:
        throw(`Invalid Instruction at line ${exePointer}: [${currentIns.operand} ${currentIns.value}].`);
    }
  }
  currentIns = instructions[exePointer];
  if (exePointer in loopDetector) {
    // console.log (`Loop found at line ${exePointer}: [${currentIns.operand} ${currentIns.value}]. Accumulator = ${accum}`);
    return 'loop';
  }
  return `${accum}`;
}
runProgram(originalCode); //?

// Part 2: Replace 1 JMP with NOP or 1 NOP with JMP to fix the program. Find the final accumulator value.
originalCode.length; //?
originalCode.filter(i => i.operand == 'nop').length; //?
originalCode.filter(i => i.operand == 'jmp').length; //?
// Trying all possible combinations = O(m*n) = O(641*311) = 199,351

function modifyCode (instructions: Array<Instruction>): string  {
  let programCopy = [...instructions];
  
  for (let i = 0; i < programCopy.length; i++) {

    // Fast forward to next modify point
    while ( programCopy[i].operand != 'jmp' &&
            programCopy[i].operand != 'nop'    ) i++;
    if (i > programCopy.length) return "End of program exceeded. Bailing out.";

    // Modify the code, run it, and unmodify it.
    programCopy[i].operand = programCopy[i].operand === 'jmp' ? 'nop' : 'jmp';
    let accum = runProgram(programCopy);
    if (accum != 'loop') {
      console.log (`Program fixed. Replaced line ${i} with [${programCopy[i].operand} ${programCopy[i].value}]`);
      return `Final accumulator = ${accum}`;
    }
    programCopy[i].operand = programCopy[i].operand === 'jmp' ? 'nop' : 'jmp';

  }
  return "No solution found";
}

modifyCode(originalCode); //?