// Input Parsing
let input = document.body.children[0].innerText. split('\n\n');

let rules = input[0].split('\n').map(rules => rules.split(': '))
                .map(rule => rule.map((d,i) => {
                   if (i === 0) return +d;
                   else {
                       if (d.length === 3) return d.slice(1, -1);
                       else {
                           return d.split(' | ').map(sub => sub.split(' ').map(n => +n));
                       }
                   }
                }));

let ruleData = new Map();

for (const rule of rules) {
    ruleData.set(rule[0], rule[1]);
}

let messages = input[1].split('\n').slice(0,-1);


// Solution
let assembleMatches = (rule) => {
    const memo = new Map();

    const helper = (ruleNum) => {
        const res = [];

        if (memo.has(ruleNum)) return memo.get(ruleNum);

        const data = ruleData.get(ruleNum);

        if (typeof data === 'string') {
            res.push(data);
        } else {
            for (const sub of data) {
                const subRes = helper(sub[0]);
                if (sub[1]){
                    const otherSubRes = helper(sub[1]);
                    if (sub[2]) {
                        const otherOtherSubRes = helper(sub[2]);
                        for (const s of subRes) {
                            for (const o of otherSubRes) {
                                for (const d of otherOtherSubRes) {
                                    res.push(s + o + d);
                                }
                            }
                        }
                    } else {
                        for (const s of subRes) {
                            for (const o of otherSubRes) {
                                res.push(s + o);
                            }
                        }
                    }
                }
                else {
                    for (const s of subRes) {
                        res.push(s);
                    };
                }
            }
        }

        memo.set(ruleNum, res);

        return res;
    }

    return helper(rule);
}


// Part 1
let matches = assembleMatches(0);

let validMessageCount = (messages, rules) => {
    let count = 0;

    for (const message of messages) {
        let matches = false;
        for (const rule of rules) {
            if (message === rule) {
                matches = true;
                break;
            }
        }
        if (matches) count++;
    }

    return count;
}

let part1 = validMessageCount(messages, matches);
console.log(part1);


// Part 2
ruleData.set(8, [[42], [42, 8]]);
ruleData.set(11, [[42, 31], [42, 11, 31]]);

