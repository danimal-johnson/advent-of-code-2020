const data = [
  1293, 1207, 1623, 1675, 1842, 1410, 85, 1108, 557, 1217, 1506, 1956, 1579, 1614, 1360, 1544, 1946, 1666, 1972, 1814,
  1699, 1778, 1529, 2002, 1768, 1173, 1407, 1201, 1264, 1739, 1774, 1951, 1980, 1428, 1381, 1714, 884, 1939, 1295, 1694,
  1168, 1971, 1352, 1462, 1828, 1402, 1433, 1542, 1144, 1331, 1427, 1261, 1663, 1820, 1570, 1874, 1486, 1613, 1769, 1721,
  1753, 1142, 1677, 2010, 1640, 1465, 1171, 534, 1790, 2005, 1604, 1891, 1247, 1281, 1867, 1403, 2004, 1668, 1416, 2001,
  1359, 686, 1965, 1728, 1551, 1565, 1128, 1832, 1757, 1350, 1808, 1711, 1799, 1590, 1989, 1547, 1140, 1905, 1368, 1179,
  1902, 1473, 1908, 1859, 1257, 1394, 1244, 1800, 1695, 1731, 1474, 1781, 1885, 1154, 1990, 1929, 1193, 1302, 1831, 1226,
  1418, 1400, 1435, 1645, 1655, 1843, 1227, 1481, 1754, 1290, 1685, 1498, 71, 1286, 1137, 1288, 1758, 1987, 1471, 1839,
  1545, 1682, 1615, 1475, 1849, 1985, 1568, 1795, 1184, 1863, 1362, 1271, 1802, 1944, 1821, 1880, 1788, 1733, 1150, 1314,
  1727, 1434, 1833, 1312, 1457, 160, 1629, 1967, 1505, 1239, 1266, 1838, 1687, 1630, 1591, 1893, 1450, 1234, 1755, 1523,
  1533, 1499, 1865, 1725, 1444, 1517, 1167, 1738, 1519, 1263, 1901, 1627, 1644, 1771, 1812, 1270, 1497, 1707, 1708, 1396
];

const part1 = (arr) => {
  let ht = {};
  for (num of arr) {
    let complement = 2020 - num;
    ht[num] = true;
    if (complement in ht) {
      console.log(`${num} + ${complement} = ${num + complement}`);
      return num * complement;
    }
  }
}

const oldPart2 = (arr) => {
  let ht1 = {};
  let ht2 = {};
  // Create a hash table indexed by complements.
  // Ex: 10 is stored as ht[2010] = 10
  // Note: the 2010 part is a string.
  // Create a 2nd hash table mirroring the array.
  for (let num of arr) {
    let complement = 2020 - num;
    ht1[complement] = num;
    ht2[num] = true;
  }
  for (let comp in ht1) {
    let compVal = parseInt(comp); //?
    for (let num2 of arr) {
      let comp2 = ht1[comp] - num2; //?
      if (ht2[comp2] === true) {
        console.log(`${compVal} + ${num2} + ${comp2} = ${compVal + num2 + comp2}`);
        console.log(`${compVal} * ${num2} * ${comp2} = ${compVal * num2 * comp2}`);
        ht1;
        ht2;
        return compVal * num2 * comp2;
      }
    }
  }
  return 0;
}

const part2 = (arr) => {
  let ht = {};
  // Create hash table of all elements in the array for faster lookup
  for (let num of arr) {
    ht[num] = true;
  }

  // Walk through entire array
  for (let i=0; i<arr.length; i++) {
    let num1 = arr[i];
    let comp = 2020 - num1;
    
    // See if there are 2 numbers that add up to comp
    for (let num2 of arr) {
      // Subtract 2nd number from remaining part of 2020
      let comp2 = comp - num2;
      // If that number is there, we have a match
      if (ht[comp2]) {
        console.log(`${num1} + ${num2} + ${comp2} = ${num1 + num2 + comp2}`);
        console.log(`${num1} * ${num2} * ${comp2} = ${num1 * num2 * comp2}`);
        return num1 * num2 * comp2;
      }
    }
  }
  return null;
}

const test = [20, 1, 3, 7, 10, 2000]

part1(data); //?
part2(data); //?
10 * 1207 * 803; //?