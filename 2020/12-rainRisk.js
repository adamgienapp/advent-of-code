// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1)
                .map(row => [row[0], parseInt(row.slice(1))]);


//Part 1
let resolveInstructions = (instructions) => {
    const vector = {
        "N": [0, 1],
        "E": [1, 0],
        "S": [0, -1],
        "W": [-1, 0]
    };

    const card = ['E', 'S', 'W', 'N'];
    let facing = 0;
    let [x, y] = [0,0];
    let dX, dY;

    for (const [dir, val] of instructions) {
        if (dir === 'F') {
            [dX, dY] = vector[card[facing]];
            x += dX * val;
            y += dY * val;
        } else if (dir === 'L' || dir === 'R') {
            let shift = val / 90;
            let sign = dir === 'L' ? -1 : 1;
            facing = (facing + (shift * sign) + 4) % 4;
        } else {
            [dX, dY] = vector[dir];
            x += dX * val;
            y += dY * val;
        }
    }

    return Math.abs(x) + Math.abs(y);
}

let part1 = resolveInstructions(input);
console.log(part1);


//Part 2
let resolveWaypointInstructions = (instructions) => {
    const vector = {
        "N": [0, 1],
        "E": [1, 0],
        "S": [0, -1],
        "W": [-1, 0]
    };
    
    let [shipX, shipY] = [0, 0];
    let [pointX, pointY] = [10,1];
    let dX, dY;

    const rotateLeft = () => {
        [dX, dY] = [pointX - shipX, pointY - shipY];
        pointX = shipX - dY;
        pointY = shipY + dX
    }
    const rotateRight = () => {
        [dX, dY] = [pointX - shipX, pointY - shipY];
        pointX = shipX + dY;
        pointY = shipY - dX;
    }

    for (const [dir, val] of instructions) {
        if (dir === 'F') {
            dX = pointX - shipX;
            dY = pointY - shipY;
            shipX += dX * val;
            shipY += dY * val;
            pointX += dX * val;
            pointY += dY * val;
        } else if (dir === 'L') {
            for (let i = 1; i <= val/90; i++) {
                rotateLeft();
            }
        } else if (dir === 'R') {
            for (let i = 1; i <= val/90; i++) {
                rotateRight();
            }
        } else {
            [dX, dY] = vector[dir];
            pointX += dX * val;
            pointY += dY * val;
        }
    }

    return Math.abs(shipX) + Math.abs(shipY);
}

// let test = [
//     ["F", 10],
//     ["N", 3],
//     ["F", 7],
//     ["R", 90],
//     ["F", 11]
// ];

// console.log(resolveWaypointInstructions(test) === 286);

let part2 = resolveWaypointInstructions(input);
console.log(part2);