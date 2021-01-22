// 3-dimensional infinite grid.
// Start with 1 slice: #=on, .=off
// After 6 cycles, how many locations are on?
// If a coord is #: if 2 or 3 neighbors are on, coord stays on. Else off.
// If a coord is .: if exactly 3 neighbors are on, it turns on.
var initState = ['.###.#.#',
    '####.#.#',
    '#.....#.',
    '####....',
    '#...##.#',
    '########',
    '..#####.',
    '######.#'
];
// Playing field is infinite. Only store *active* states.
var getActiveNodes = function (rows) {
    var nodes = new Set();
    for (var y = 0; y < rows.length; y++) {
        for (var x = 0; x < rows[0].length; x++) {
            var state = rows[y][x];
            if (state === '#') {
                var node = x + "," + y + ",0";
                nodes.add(node);
            }
        }
    }
    return nodes;
};
var getAdjacentCoords = function (coords) {
    // const [x, y, z] = [...coords.split(',').map(x => parseInt(x))];
    var _a = coords.split(',').map(Number), x = _a[0], y = _a[1], z = _a[2];
    var coordList = new Set();
    console.log(x, y, z);
    console.log(typeof (x));
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            for (var dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0)
                    continue; // Skip self
                coordList.add(x + dx + "," + (y + dy) + "," + (z + dz));
            }
        }
    }
    return coordList;
};
var initNodes = getActiveNodes(initState);
console.log(initNodes.size);
var runStep = function (currentNodes) {
    var newNodes = new Set();
    console.log(currentNodes);
    typeof (currentNodes); //?
    var snafu = Array.from(currentNodes);
    console.log(snafu);
    typeof (snafu); //?
    for (var _i = 0, snafu_1 = snafu; _i < snafu_1.length; _i++) {
        var whopper = snafu_1[_i];
        console.log(whopper); //?
    }
    // for (let node of currentNodes) {
    //   let adjList = getAdjacentCoords(node);
    //   console.log("hi"); //?
    //   let activeAdjCount = 0;
    //   console.log(node); //?
    //   // Count the number of adjacent nodes that are active
    //   for (let adj of adjList) {
    //     if (adjList.has(node)) activeAdjCount++;
    //   }
    //   // Keep nodes ON only if they meet the criteria
    //   if (activeAdjCount === 2 || activeAdjCount === 3) {
    //     newNodes.add(node);
    //   } else {
    //     newNodes.add('yo');
    //   }
    //   // TODO: Turn nodes ON that are OFF only if they met the criteria.
    // }
    return newNodes;
};
var runSim = function (currentNodes) {
};
console.log(runStep(initNodes));
