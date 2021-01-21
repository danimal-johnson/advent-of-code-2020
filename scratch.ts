'use strict'
declare function require(name: string);
const fs = require('fs');

let [tsStr, busStr] = fs.readFileSync('scratch.txt', 'utf-8').split('\n');
let timestamp: number = parseInt(tsStr);

let buses = busStr
  .split(',')
  .map((busId, index) => {
    const bus = {
      id: parseInt(busId),
      offset: index
    }
    return bus;
  })
  .filter (x => x.id);

buses[1]; //?

// Greatest Common Divisor
// Recursive function
// gcd (a, a) = a
// gcd (a, b) = gcd(a-b, b) if a > b
// gcd (a, b) = gcd(a, b-a) if a < b
// The first element of the return array is the result
function gcd (a: number, b: number) : Array<number> {
  if (a === 0) {
    return [b, 0, 1];
  }
  const [g, x1, y1] = gcd(b % a, a);
  return [g, y1 - Math.trunc(b/a) * x1, y1];
}

// Multiplicitave Inverse
// Uses Greatest Common Denominator
function multInv(b, m) {
  const [g,x,y] = gcd(b, m);
  if (g !== 1) {
    console.log(`Warning! gcd(${b},${m}) may have failed`)
  }
  let result = x % m;
  while (result < 0) {
    result += m;
  }
  return result;
}

let time = 0;
let stepSize = 1;
buses.forEach(bus => {
  const interval = bus.id; //?
  const index = bus.offset; //?
  const timeToLeave = (interval - (time + index) % interval) % interval; //?
  const inv = multInv(stepSize, interval); //?
  let step = (inv * timeToLeave) % interval; //?

  time += stepSize * step;
  stepSize *= interval;
})
time;
stepSize;
time + stepSize; //?
// 47223437167088 is too low
// 530015546283687 from https://www.youtube.com/watch?v=k2AOtYoCkhI ?

let ans = 47223437167088;
// let ans = 530015546283687;

buses.map (bus => console.log((ans + bus.offset)/bus.id));

gcd (18, 84); //?
gcd (3, 9); //?