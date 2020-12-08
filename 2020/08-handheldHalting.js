// Input parsing
let input = document.body.children[0].innerText
                .split('\n').slice(0,-1)
                .map(op => op.split(' ')
                              .map((d,i) => {
                                  if (i === 1) return parseInt(d);
                                  else return d;
                              }));


// Part 1
let findAccAtInfiniteLoop = (ops) => {
    let visited = new Set();
    let accumulator = 0;

    let i = 0;
    while(!visited.has(i) && i < ops.length) {
        visited.add(i);
        let [op, val] = ops[i];
        if (op === 'acc') {
            accumulator += val;
            i++;
        }
        else if (op === 'jmp') {
            if (val < 0) {
                i = Math.max(0, i + val);
            } else {
                i = i + val;
            }
        } else {
            i++;
        }
    }

    return accumulator;
}

let part1Ans = findAccAtInfiniteLoop(input);


// Part 2
let bootSequenceOK = (ops) => {
    let visited = new Set();
    let accumulator = 0;

    let i = 0;
    while(!visited.has(i) && i < ops.length) {
        visited.add(i);
        let [op, val] = ops[i];
        if (op === 'acc') {
            accumulator += val;
            i++;
        }
        else if (op === 'jmp') {
            if (val < 0) {
                i = Math.max(0, i + val);
            } else {
                i = i + val;
            }
        } else {
            i++;
        }
    }

    return i === ops.length;
}

let findAccAfterFixedBoot = (ops) => {
    for (let i = 0; i < ops.length; i++) {
        let op = ops[i][0];
        if (op === 'jmp') {
            ops[i][0] = 'nop';
            if (bootSequenceOK(ops)) {
                break;
            }
            ops[i][0] = 'jmp';
        } else if (op === 'nop') {
            ops[i][0] = 'jmp';
            if (bootSequenceOK(ops)) {
                break;
            }
            ops[i][0] = 'nop';
        }
    }

    return findAccAtInfiniteLoop(ops);
}

let part2Ans = findAccAfterFixedBoot(input);