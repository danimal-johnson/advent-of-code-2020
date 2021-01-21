
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
const getActiveNodes = (rows) => {
  const nodes = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      let state = rows[y][x];
      if (state === '#') {
        const node = `${x},${y},0`;
        nodes.push(node);
      }
    }
  }
  return nodes;
}

const getAdjacentCoords = (coords: string) => {
  const coordArr = [...coords.split(',')];
  const [x, y, z] = coordArr;
  console.log(coordArr);
  console.log(x, y, z);
  console.log(typeof(x));
}
getAdjacentCoords('2,3,4');

const initNodes = getActiveNodes(initState);
console.log(initNodes);
