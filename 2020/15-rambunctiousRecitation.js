let input = [20,9,11,0,1,2];

// Solution
let findNthNumber = (starters, n) => {
  const memory = new Map();

  for (let i = 0; i < starters.length; i++) {
    memory.set(starters[i], i);
  }

  let turn = starters.length;
  let next = 0;
  while (turn < n - 1) {
    if (memory.has(next)) {
      let temp = next;
      next = turn - memory.get(next);
      memory.set(temp, turn);
    } else {
      memory.set(next, turn);
      next = 0;
    }
    turn++;
  }

  return next;
}

// Part 1
let t1 = [1,3,2]; // 1
let t2 = [2,1,3]; // 10
let t3 = [1,2,3]; // 27
let t4 = [2,3,1]; // 78
let t5 = [3,2,1]; // 438
let t6 = [3,1,2]; // 1836

let part1 = findNthNumber(input, 2020);
console.log(part1);

// Part 2
let t7 = [0,3,6]; // 175594

let part2 = findNthNumber(input, 30000000);
console.log(part2);