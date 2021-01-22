// https://adventofcode.com/2020/day/17
// Day 17: Conway Cubes
'use strict';

// 3-dimensional infinite grid.
// Start with 1 slice: #=on, .=off
// After 6 cycles, how many locations are on?

// If a coord is #: if 2 or 3 neighbors are on, coord stays on. Else off.
// If a coord is .: if exactly 3 neighbors are on, it turns on.

const initState =
[ '.###.#.#',
  '####.#.#',
  '#.....#.',
  '####....',
  '#...##.#',
  '########',
  '..#####.',
  '######.#'
]

// Playing field is infinite. Only store *active* states.
const getActiveNodes = (rows: Array<string>): Set<string> => {
  const nodes = new Set<string>();
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      let state = rows[y][x];
      if (state === '#') {
        const node = `${x},${y},0`;
        nodes.add(node);
      }
    }
  }
  return nodes;
}

const getAdjacentCoords = (coords: string):Set<string> => {
  // const [x, y, z] = [...coords.split(',').map(x => parseInt(x))];
  const [x, y, z] = coords.split(',').map(Number);
  const coordList = new Set<string>();

  console.log(x, y, z);
  console.log(typeof(x));

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue; // Skip self
          coordList.add(`${x+dx},${y+dy},${z+dz}`)
      }
    }
  }
  return coordList;
}

const initNodes = getActiveNodes(initState);
console.log(initNodes.size);

const runStep = (currentNodes) => {
  const newNodes = new Set<string>();

  // ------ Set iteration isn't working
  for (let s of currentNodes) console.log(s); //?
  for (let s of currentNodes.values()) console.log(s); //?
  for (let s of currentNodes.keys()) console.log(s); //?

  // ------ Converting to array first seems to allow iteration
  let snafu = Array.from(currentNodes);
  console.log(snafu);

  for (let i = 0; i < snafu.length; i++ ) {
    console.log(snafu[i]);
  }
  for (let sn of snafu) console.log(snafu);
  // --------

  for (let i = 0; i < currentNodes.size; i++) {
    let node = currentNodes[i];
    let adjList = new Set(getAdjacentCoords(node));
    let activeAdjCount = 0;
    
    // Count the number of adjacent nodes that are active
    for (let adj of adjList) {
      if (adjList.has(node)) activeAdjCount++;
    }
    // Keep nodes ON only if they meet the criteria
    if (activeAdjCount === 2 || activeAdjCount === 3) {
      newNodes.add(node);
    } else {
      newNodes.add('yo');
    }
    // TODO: Turn nodes ON that are OFF only if they met the criteria.
  }
  return newNodes;
}

const runSim = (currentNodes: Set<string>) => {

}

console.log(runStep(initNodes));