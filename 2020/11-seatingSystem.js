// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1)
                .map(row => row.split(''));


//Part 1
let findOccupiedSeatsAtEquilibrium = (seats) => {
    const countAdjacent = (x, y) => {
        let dir = [[-1,-1],[1,1],[-1,1],[1,-1],[-1,0],[0,-1],[1,0],[0,1]];

        let adjacentCount = 0;

        for (const [dX, dY] of dir) {
            let vX = x + dX;
            let vY = y + dY;

            if (vX < 0 || vY < 0 || vX > seats[0].length - 1 || vY > seats.length - 1) {
                continue;
            }

            if (seats[vY][vX] === '#' || seats[vY][vX] === '-') {
                adjacentCount++;
            }
        }

        return adjacentCount;
    }

    let changed = true;

    while (changed) {
        changed = false;
        for (let y = 0; y < seats.length; y++) {
            for (let x = 0; x < seats[0].length; x++) {
                if (seats[y][x] === 'L' && countAdjacent(x, y) === 0) {
                    seats[y][x] = '+';
                    changed = true;
                } else if (seats[y][x] === '#' && countAdjacent(x, y) > 3) {
                    seats[y][x] = '-';
                    changed = true;
                }
            }
        }
        if (changed) {
            seats = seats.map(row => row.map(seat => {
                if (seat === '+') {
                    return '#';
                } else if (seat === '-') {
                    return 'L';
                } else {
                    return seat;
                }
            }));
        }
    }
    
    let occupied = 0;

    seats.forEach(row => row.forEach(seat => {
        if (seat === '#') occupied++;
    }));

    return occupied;
}

let part1 = findOccupiedSeatsAtEquilibrium(input);
console.log(part1);


//Part 2
let findOccupiedSeatsAtNewEquilibrium = (seats) => {
    const countAdjacent = (x, y) => {
        let dir = [[-1,-1],[1,1],[-1,1],[1,-1],[-1,0],[0,-1],[1,0],[0,1]];

        let adjacentCount = 0;

        for (const [dX, dY] of dir) {
            let vX = x + dX;
            let vY = y + dY;

            if (vX < 0 || vY < 0 || vX > seats[0].length - 1 || vY > seats.length - 1) {
                continue;
            }

            while (seats[vY][vX] === '.' && vX > 0 && vX < seats[0].length - 1 && vY > 0 && vY < seats.length - 1) {
                vX += dX;
                vY += dY;
            }

            if (seats[vY][vX] === '#' || seats[vY][vX] === '-') {
                adjacentCount++;
            }
        }

        return adjacentCount;
    }

    let changed = true;
    
    while (changed) {
        changed = false;
        for (let y = 0; y < seats.length; y++) {
            for (let x = 0; x < seats[0].length; x++) {
                if (seats[y][x] === 'L' && countAdjacent(x, y) === 0) {
                    seats[y][x] = '+';
                    changed = true;
                } else if (seats[y][x] === '#' && countAdjacent(x, y) > 4) {
                    seats[y][x] = '-';
                    changed = true;
                }
            }
        }
        if (changed) {
            seats = seats.map(row => row.map(seat => {
                if (seat === '+') {
                    return '#';
                } else if (seat === '-') {
                    return 'L';
                } else {
                    return seat;
                }
            }));
        }
    }
    
    let occupied = 0;

    seats.forEach(row => row.forEach(seat => {
        if (seat === '#') occupied++;
    }));

    return occupied;
}

let part2 = findOccupiedSeatsAtNewEquilibrium(input);
console.log(part2);