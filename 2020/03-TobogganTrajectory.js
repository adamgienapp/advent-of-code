/* Part 1 */

let input = document.body.children[0].innerText.split('\n');
input.pop();

let tobogganRide = (hill, dX, dY = 1) => {
  let treeCount = 0;
  
  let rowLen = hill[0].length;
  for (let i = 0; i * dY < hill.length; i++) {
    let [x, y] = [(dX * i) % rowLen, dY * i];
    if (hill[y][x] === '#') treeCount++;
  }

  return treeCount;
}

// tobogganRide(input, 3); //262


/* Part 2 */

// tobogganRide(input, 1) * tobogganRide(input, 3) * tobogganRide(input, 5) * tobogganRide(input, 7) * tobogganRide(input, 1, 2); //2698900776