// https://adventofcode.com/2020/day/12
// Day 13: Shuttle Search
'use strict';

// ------------------------- Part 1 ----------------------------------
// Buses are numbered by the interval they arrive (ex: bus 5 arrives every 5 mins)
// The buses started running at time 0.
// You arrive at the port at time t
// Find the earliest bus you could take. How long will you need to wait?
// Solution = wait time * bus ID.

function part1(earliestTime: number, buses: Array<number>): number {
  let lastDepartures = buses.map(x => Math.floor(earliestTime/x) * x); //?
  let nextDepartures = [];
  for (let i=0; i<buses.length; i++) {
    nextDepartures[i] = buses[i] + lastDepartures[i];
  }
  let waitTimes = nextDepartures.map(x => x - earliestTime); //?
  let minTime = Math.min(...waitTimes); //?
  let busIndex = waitTimes.findIndex(x => x === minTime); //?
  let busNumber = buses[busIndex]; //?

  return busNumber * minTime;
}
// Expect 2165
// part1(1007153, [29,37,433,13,17,19,23,977,41]); //?

// -------------------------- Part 2 ------------------------------
// Buses started at time 0.
// You want to find the earliest time they will arrive in a specific pattern:
// Bus 0 arrives at time t (the solution)
// Bus 1 arrives at t+1 minute. Bus 2 arrives at t+2 minutes, etc.
// the out-of-service buses must still be included in the calculation.
// Ex: [4,5,x,x,6,x,2] => offsets [0,1,x,x,4,x,6]
// => [4*a, 5*b+1, 6*c+4, 2*d+6]. (Actual values of a,b,c,d are not important.)

function part2(busInput: Array<string>): number {
  let buses = [];
  let dt = [];
  let minimums = [];
  for (let i=0; i<busInput.length; i++) {
    if (busInput[i] !== 'x') {
      let val = parseInt(busInput[i])
      buses.push(val);
      minimums.push(val+i);
      dt.push(i); // TODO: Maybe not needed
    } 
  }
  
  let current = [...buses];
  // Starting point
  // while (current[0] < biggest) current[0] += buses[0];
  let time = current[0];
  
  let matches = 0;
  let maxOvershoot = 0;

  // --- Main Loop ---
  while (time < 1000000000000000) {
    // Check for solution
    matches = 0;
    for (let i = 0; i < buses.length; i++) {
      if (current[i] === minimums[i]) matches++;
    }
    if (matches === buses.length) {
      console.log("Woohoo!", time);
      return time;
    }

    // Advance current time to new minimum spot
    maxOvershoot = 0;
    for (let i = 1; i < buses.length; i++) {
      if (current[i] > minimums[i]) {
        maxOvershoot = Math.max(maxOvershoot, current[i] - minimums[i]);
      }
    }
    while (time < current[0] + maxOvershoot) {
      time += buses[0];
    }
    current[0] = time;

    // Update minimums
    for (let i = 0; i < buses.length; i++) {
      minimums[i] = time + dt[i];
    }
    
    // Increase bus times up to minimums
    for (let i = 1; i < buses.length; i++) {
      while(current[i] < minimums[i]) {
        current[i] += buses[i];
        // console.log(`${i}: ${current[i]}`);
      }
    }
    
    // console.log(current);
  }

  // These appear to be primes, so the LCM is their product.
  // let lcm = buses.reduce((a,b) => a * b); //?
  // The solutions to the examples are smaller than the LCM, though.
  

  return -1;
}

let inputStr: string = [
  "29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,",
  "37,x,x,x,x,x,433,x,x,x,x,x,x,x,x,x,x,x,x,13,17,",
  "x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,977,x,x,x,x,x",
  ",x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,",
  "x,x,x,x,x,x,x,x,x,x,x,x,41"].join('');
let input = inputStr.split(',');

// part2(input);

// Expect 3417
// part2(['17','x','13','19']); //?

// Expect 754018
// part2(['67','7','59','61']); //?

// Expect 779210
// part2(['67','x','7','59','61']); //?

// Expect 1261476
// part2(['67','7','x','59','61']); //?

// Expect 1202161486
// part2(['1789','37','47','1889']); //?

// ** Note: the examples work fine, but it's very inefficient.
// The computer cannot come up with a solution to the actual
// problem in a reasonable amount of time.
// A proper solution would probably involve the Chinese Remainder Theorem.

// * Observation: If you drop any one number from the arrays, the solution will
// be divisible by the product of the rest of the elements.