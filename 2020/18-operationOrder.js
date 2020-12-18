// Input parsing
let input = document.body.children[0].innerText.split('\n')
                                                .slice(0, -1);

// Solution
let evalString = (str) => {
  let res = null;
  
  let op = null;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === ' ') continue;
    if (char === '(') {
      let stack = [')'];
      let start = i;
      i++;
      while (stack.length) {
        if (str[i] === '(') {
          stack.push(')');
        }
        if (str[i] === ')') {
          stack.pop();
        }
        i++;
      }
      str = str.slice(0, start) + `${evalString(str.slice(start + 1, i - 1))}` + str.slice(i);
      i = start;
      char = str[i];
    }
    if (!Number.isNaN(+char) && res === null) {
      let num = char;
      while (!Number.isNaN(+str[i+1])) {
        i++;
        num += str[i];
      }
      res = +num;
    } else if (char === '+' || char === '*') {
      op = char;
    } else {
      let num = char;
      while (!Number.isNaN(+str[i+1])) {
        i++;
        num += str[i];
      }
      res = op === '+' ? res + (+num) : res * (+num);
    }
  }

  return res;
}

// Tests
let t1 = '1 + (2 * 3) + (4 * (5 + 6))'; // 51
let t2 = '2 * 3 + (4 * 5)'; // 26
let t3 = '5 + (8 * 3 + 9 + 3 * 4 * 3)'; // 437
let t4 = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'; // 12240
let t5 = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'; // 13632


// Part 1 Ans
let part1 = input.reduce((a,b) => a + evalString(b), 0);
console.log(part1);



// Part 2
let editInput = (exp) => {
  for (let i = 0; i < exp.length; i++) {
    let char = exp[i];
    if (char === '+') {
      let start = i;
      // go left
      let [l, r] = [i-1, i+1];
      let [lStack, rStack] = [[' '], [' ']];
      while (lStack.length && l > 0) {
        l--;
        if (exp[l] === ')') {
          lStack.push('(');
        } else if (exp[l] === lStack[lStack.length - 1]) {
          lStack.pop();
        }
      }
      while (rStack.length && r < exp.length) {
        r++;
        if (exp[r] === '(') {
          rStack.push(')');
        } else if (exp[r] === rStack[rStack.length - 1]) {
          rStack.pop();
        }
      }
      exp = l === 0 ? 
        exp.slice(0, l) + '(' + exp.slice(l, r) + ')' + exp.slice(r)
        :
        exp.slice(0, l+1) + '(' + exp.slice(l+1, r) + ')' + exp.slice(r);
      i++;
    }
  }

  return exp;
}

// Tests
let t6 = editInput(t1); // 51
let t7 = editInput(t2); // 46
let t8 = editInput(t3); // 1445
let t9 = editInput(t4); // 669060
let t10 = editInput(t5); // 23340

// Part 2 Ans
let newInput = input.map(exp => editInput(exp));

let part2 = newInput.reduce((a,b) => a + evalString(b), 0);
console.log(part2);