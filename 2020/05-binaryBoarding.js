let input = document.body.children[0].innerText.split('\n');
input.pop();

let decodeSeatID = (data) => {
    let rows = data.slice(0, 7);
    let columns = data.slice(-3);

    let [rMin, rMax] = [0, 127];
    let i = 0;
    while (i < rows.length) {
        let half = rows[i];
        if (half === 'F') {
            rMax = Math.floor((rMin + rMax) / 2);
        } else {
            rMin = Math.ceil((rMin + rMax) / 2);
        }
        i++;
    }

    let [cMin, cMax] = [0, 7];
    let j = 0;
    while (j < columns.length) {
        let half = columns[j];
        if (half === 'L') {
            cMax = Math.floor((cMin + cMax) / 2);
        } else {
            cMin = Math.ceil((cMin + cMax) / 2);
        }
        j++;
    }

    return rMin * 8 + cMin;
}

let findHighestSeatID = (seats) => {
    let max = 0;

    for (let i = 0; i < seats.length; i++) {
        let currID = decodeSeatID(seats[i]);
        max = Math.max(max, currID);
    }

    return max;
}

let findYourSeat = (seats) => {
    let ids = seats.map(x => decodeSeatID(x)).sort((a,b) => a - b);

    let prev = ids[0];
    for (let i = 1; i < ids.length; i++) {
        let curr = ids[i];
        if (curr - prev === 2) return curr - 1;
        else prev = curr;
    }

    return 'Seat not found';
}

/**
 * Part 1:  findHighestSeat(input);
 * 
 * Part 2:  findYourSeat(input);
 */
