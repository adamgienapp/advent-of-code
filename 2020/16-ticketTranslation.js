// Input parsing
let input = document.body.children[0].innerText.split('\n\n');

let rules = input[0].split('\n')
                       .map(rule => rule.split(': ')
                                        .map((d,i) => {
                                          switch(i) {
                                            case 1:
                                              return d.split(' or ').map(range => range.split('-').map(n => +n));
                                            default:
                                              return d;
                                          }
                                        }));

let ticket = input[1].split('your ticket:\n')[1].split(',').map(n => +n);

let nearbyTickets = input[2].split('nearby tickets:\n')[1]
                            .split('\n').slice(0, -1)
                            .map(t => t.split(',').map(n => +n));

// Solution
let findInvalidTickets = (tickets, rules) => {
  const invalid = [];
  const badTickets = [];

  tickets.forEach((ticket, idx) => {
    for (const num of ticket) {
      let valid;
      for (const rule of rules) {
        valid = false;
        for (const [min, max] of rule[1]) {
          if (num >= min && num <= max) {
            valid = true;
            break;
          }
        }
        if (valid) break;
      }
      if (!valid) {
        invalid.push(num);
        badTickets.push(idx);
      }
    }
  });

  return [invalid, badTickets];
}

// Part 1
let badBits = findInvalidTickets(nearbyTickets, rules);
let part1 = badBits[0].reduce((a,b) => a + b, 0);
console.log(part1);


// Part 2
let goodTix = nearbyTickets.filter((t,i) => badBits[1].indexOf(i) === -1);

let findRuleIndexes = (tickets, rules) => {
  const ticketBuckets = Array.from({ length: 20 }, () => []);
  const possibleRulesPerIdx = {};

  for (let i = 0; i < 20; i++) {
    possibleRulesPerIdx[i] = [];
    tickets.forEach(ticket => {
      ticketBuckets[i].push(ticket[i]);
    });
  }

  ticketBuckets.forEach((bucket, idx) => {
    for (let i = 0; i < rules.length; i++) {
      let valid;
      for (const num of bucket) {
        valid = false;
        for (const [min, max] of rules[i][1]) {
          if (num >= min && num <= max) {
            valid = true;
          }
        }
        if (!valid) break;
      }
      if (valid) {
        possibleRulesPerIdx[idx].push(i);
      }
    }
  });

  let hasMultiple = 20;
  let setRules = new Set();
  while (hasMultiple) {
    for (const key in possibleRulesPerIdx) {
      let possRules = possibleRulesPerIdx[key];
      if (possRules.length === 1 && setRules.has(possRules[0])) continue;

      for (let i = 0; i < possRules.length; i++) {
        if (setRules.has(possRules[i])) {
          possRules.splice(i, 1);
          i--;
        }
      }
      if (possRules.length === 1) {
        setRules.add(possRules[0]);
        hasMultiple--;
      }
    }
  }

  return possibleRulesPerIdx;
}

let rulesAtTicketIndex = findRuleIndexes(goodTix, rules);

let vals = [];
for (const key in rulesAtTicketIndex) {
  if (rulesAtTicketIndex[key] < 6) {
    vals.push(ticket[+key]);
  }
}

let part2 = vals.reduce((a,b) => a * b, 1);
console.log(part2);