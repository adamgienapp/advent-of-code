// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1);

input[0] = parseInt(input[0]);
input[1] = input[1].split(',');

let running = input[1].filter(a => a !== 'x');


//Part 1
let findEarliestBusID = (earliestDeparture, buses) => {
    let earliestBus = null;
    let timeUntilAppearance = Infinity;
    
    for (const busID of buses) {
        let diff = +busID - (earliestDeparture % +busID);
        if (diff < timeUntilAppearance) {
            timeUntilAppearance = diff;
            earliestBus = +busID;
        }
    }

    return [earliestBus, timeUntilAppearance];
}

let part1 = findEarliestBusID(input[0], running);
console.log(part1[0] * part1[1]);


//Part 2
let findMagicTime = (buses) => {
    let targets = [];
    
    for (let i = 0; i < buses.length; i++) {
        if (buses[i] !== 'x') {
            targets.push([+buses[i], i]);
        }
    }
    
    let num = targets[0][0];
    let lcd = num;
    for (let i = 1; i < targets.length; i++) {
        let [int, rem] = targets[i];
        while ((num + rem) % int !== 0) {
            num += lcd;
        }
        lcd = lcd * int;
    }

    return num;
}

// // Tests
// let t1 = ['17','x','13','19'];  // 3417
// let t2 = ['67','7','59','61'];  // 754018
// let t3 = ['67','x','7','59','61'];  // 779210
// let t4 = ['1789','37','47','1889']; // 1202161486

let part2 = findMagicTime(input[1]);
console.log(part2);