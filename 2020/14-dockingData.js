// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1)
                .map(code => code.split(/\s=\s/))
                .map(code => {
                    if (code[0] !== 'mask') {
                        return [code[0].slice(0,3), code[0].slice(4,-1), code[1]];
                    } else {
                        return code;
                    }
                });

// Solution
let applyValueMask = (input, mask) => {
    input = input.split('');
    mask = mask.split('');

    for (let i = 0; i < mask.length; i++) {
        input[i] = mask[i] === 'X' ? input[i] : mask[i];
    }

    return parseInt(input.join(''), 2);
}

let applyAddressMask = (address, mask) => {
  address = address.padStart(36, '0').split('');
  mask = mask.split('');

  for (let i = 0; i < mask.length; i++) {
      if (mask[i] === 'X') address[i] = 'X';
      else if (mask[i] === '1') address[i] = '1';
  }

  const generateList = (arr) => {
      let temp = [];
      let xFound = false;
      for (const address of arr) {
          let i = 0;
          while (address[i] !== 'X' && i < address.length) {
              i++;
          }
          if (i < address.length) {
              address[i] = '0';
              temp.push([...address]);
              address[i] = '1';
              temp.push([...address]);
              xFound = true;   
          } else {
              temp.push(address);
          }
      }
      if (xFound) return generateList([...temp]);
      else {
          return temp;
      }
  }

  return generateList([address]).map(x => x.join(''));
}

let writeValuesToMemory = (init, part1) => {
    const memory = {};

    let mask = null;
    for (let i = 0; i < init.length; i++) {
        let code = init[i];
        if (code[0] === 'mask') {
            mask = code[1];
        } else {
            if (part1) {
                let [address, val] = [code[1], (+code[2] >>> 0).toString(2).padStart(36, '0')];
                memory[address] = applyValueMask(val, mask);
            } else {
                let [address, val] = [(+code[1] >>> 0).toString(2), +code[2]];
                let addresses = applyAddressMask(address, mask);
                for (const i of addresses) {
                    memory[i] = val;
                }
            }
        }
    }

    return memory;
}

let sumMemoryValues = (memory) => {
    return Object.values(memory).reduce((a,b) => a + b, 0);
}


// Test - pt 1
let t1 = [
    ['mask', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'],
    ['mem', '8', '11'],
    ['mem', '7', '101'],
    ['mem', '8', '0']
];
// sum = 165

// Part 1
let part1 = sumMemoryValues(writeValuesToMemory(input, true));
console.log(part1);


// Test - pt 2
let t2 = [
    ['mask', '000000000000000000000000000000X1001X'],
    ['mem', '42', '100'],
    ['mask', '00000000000000000000000000000000X0XX'],
    ['mem', '26', '1']
];
// 208

// Part 2
let part2 = sumMemoryValues(writeValuesToMemory(input, false));
console.log(part2);