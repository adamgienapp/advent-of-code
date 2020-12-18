// Input parsing
let input = document.body.children[0].innerText.split('\n')
                                                .slice(0, -1)
                                                .map(row => row.split(''));

let pocketDimension = [input];

let pocket4dDimension = [[input]];



// Part 1
let expandPlane = (plane) => {
  let currWidth = plane[0].length;
  
  for (const row of plane) {
    row.unshift('.');
    row.push('.');
  }

  plane.unshift(new Array(currWidth + 2).fill('.'));
  plane.push(new Array(currWidth + 2).fill('.'));
}

let expandSpace = (space, location) => {
  let currDims = space[0].length;
  
  if (location === 'below') {
    space.unshift(Array.from({length: currDims}, () => Array.from({length: currDims}, () => '.'))); 
  } else {
    space.push(Array.from({length: currDims}, () => Array.from({length: currDims}, () => '.'))); 
  }
}

let planeHasThreeActive = (plane) => {
  let count = 0;

  for (const row of plane) {
    for (const point of row) {
      if (point === '#') count++;
      if (count === 3) return true;
    }
  }

  return false;
}

let findActiveNeighbors = ([x,y,z], space) => {
  let count = 0;

  let [below, above] = [false, false];
  if (space[z - 1]) below = true;
  if (space[z + 1]) above = true;

  if (below) {
    let plane = space[z-1];
    let deltaY = [-1, 0, 1];
    let deltaX = [-1, 0, 1];

    for (const dY of deltaY) {
      let vY = y + dY;
      if (vY >= 0 && vY < plane.length) {
        for (const dX of deltaX) {
          let vX = x + dX;
          if (vX >= 0 && vX < plane[0].length) {
            if (plane[vY][vX] === '#' || plane[vY][vX] === '-') {
              count++;
            }
          }
        } 
      }
    }
  }
  
  if (true) {
    let plane = space[z];
    let deltaY = [-1, 0, 1];
    let deltaX = [-1, 0, 1];

    for (const dY of deltaY) {
      let vY = y + dY;
      if (vY >= 0 && vY < plane.length) {
        for (const dX of deltaX) {
          if (dX === 0 && dY === 0) continue;
          let vX = x + dX;
          if (vX >= 0 && vX < plane[0].length) {
            if (plane[vY][vX] === '#' || plane[vY][vX] === '-') {
              count++;
            }
          }
        } 
      }
    }
  }

  if (above) {
    let plane = space[z+1];
    let deltaY = [-1, 0, 1];
    let deltaX = [-1, 0, 1];

    for (const dY of deltaY) {
      let vY = y + dY;
      if (vY >= 0 && vY < plane.length) {
        for (const dX of deltaX) {
          let vX = x + dX;
          if (vX >= 0 && vX < plane[0].length) {
            if (plane[vY][vX] === '#' || plane[vY][vX] === '-') {
              count++;
            }
          }
        } 
      }
    }
  }

  return count;
}

let updateActivity = (space) => {
  return space.map(plane => plane.map(row => row.map(pt => {
    if (pt === '-') {
      return '.';
    } else if (pt === '+') {
      return '#';
    } else {
      return pt;
    }
  })));
}

let runSixCycles = (space) => {
  let cycle = 1;

  while (cycle < 7) {
    space.forEach(plane => expandPlane(plane));

    if (planeHasThreeActive(space[0])) {
      expandSpace(space, 'below');
    }
    if (planeHasThreeActive(space[space.length - 1])) {
      expandSpace(space, 'above');
    }

    for (let z = 0; z < space.length; z++) {
      for (let y = 0; y < space[0].length; y++) {
        for (let x = 0; x < space[0].length; x++) {
          let point = space[z][y][x];
          let activeNeighbors = findActiveNeighbors([x, y, z], space);

          if (point === '.' && activeNeighbors === 3) {
            space[z][y][x] = '+';
          }
          if (point === '#' && (activeNeighbors < 2 || activeNeighbors > 3)) {
              space[z][y][x] = '-';
          }
        }
      }
    }

    space = updateActivity(space);
    cycle++;
  }

  return space;
}

let countTotalActive = (space) => {
  let count = 0;

  for (const plane of space) {
    for (const row of plane) {
      for (const pt of row) {
        if (pt === '#') {
          count++;
        }
      }
    }
  }

  return count;
}

// Part 1 Ans:
let modified = runSixCycles(pocketDimension);

let part1 = countTotalActive(modified);
console.log(part1);



// Part 2
'...Nope'