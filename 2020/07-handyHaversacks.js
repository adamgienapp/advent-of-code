// Input parsing
let input = document.body.children[0].innerText
                .split('.\n')
                .map(rule => rule.split(' bags contain ')
                                 .map(sub => sub.split(/ bag, | bags, | bags| bag/)));

let rules = {};

input.forEach(rule => {
    let outer = rule[0];
    let innerData = Array.isArray(rule[1]) ? rule[1].slice(0, -1).map(x => x.split(' ')) : null;
    let innerRules = {};
    if (innerData) {
        innerData.forEach(data => {
            if (+data[0]) innerRules[`${data[1]} ${data[2]}`] = +data[0];
            else innerRules = null;
        });    
    }
    rules[outer] = innerRules;
});

delete rules[''];


//Part 1

let findBagsThatCanContainShinyGold = (bags) => {
    let goodBags = new Set();
    let badBags = new Set();
    
    let helper = (bag, seen) => {
        if (bag === 'shiny gold' || goodBags.has(bag)) {
            return true;
        }
        if (!seen.has(bag) && !badBags.has(bag)) {
            seen.add(bag);
            if (bags[bag]) {
                for (const key in bags[bag]) {
                    if (helper(key, seen)) {
                        goodBags.add(bag);
                        return true;
                    }
                }
                badBags.add(bag);
                return false;
            } else {
                badBags.add(bag);
                return false;
            }
        }
    }

    for (const bag in bags) {
        helper(bag, new Set());
    }

    return goodBags.size;
}

findBagsThatCanContainShinyGold(rules);


//Part 2
let totalBagsContained = (color, bags) => {
    let memo = new Map();
    
    let helper = (bag) => {
        if (memo.has(bag)) {
            return memo.get(bag);
        }

        let totalBags = 0;
        if (bags[bag]) {
            for (const key in bags[bag]) {
                totalBags += 1 * bags[bag][key] + bags[bag][key] * helper(key);
            }
            memo.set(bag, totalBags);
            return totalBags;
        } else {
            memo.set(bag, 0);
            return 0;
        }
    }

    helper(color);

    return memo.get(color);
}

totalBagsContained('shiny gold', rules);
