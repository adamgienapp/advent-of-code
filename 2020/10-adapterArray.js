// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1)
                .map(num => +num);


//Part 1
let findJoltageDifferenceDistribution = (ratings) => {
    let diffs = [0,0,1];
    let ratingSet = new Set(ratings);

    let curr = 0;
    while (ratingSet.size) {
        if (ratingSet.has(curr + 1)) {
            diffs[0]++;
            ratingSet.delete(curr + 1);
            curr += 1;
        } else if (ratingSet.has(curr + 2)) {
            diffs[1]++;
            ratingSet.delete(curr + 2);
            curr += 2;
        } else if (ratingSet.has(curr + 3)) {
            diffs[2]++;
            ratingSet.delete(curr + 3);
            curr += 3;
        } else {
            console.log('No more valid adapters!');
            break;
        }
    }

    return diffs;
}

let dist = findJoltageDifferenceDistribution(input);

let part1 = dist[0] * dist[2];
console.log(part1);


//Part 2
let findNumberOfValidAdapterConfigs = (ratings) => {
    const max = Math.max(...ratings);
    
    ratings = ratings.sort((a,b) => a - b);

    let dp = new Array(max + 1).fill(0);
    dp[0] = 1;

    ratings.forEach(rating => {
       for (let i = 1; i <= 3; i++) {
           if (dp[rating - i]) {
               dp[rating] += dp[rating - i];
           }
       }
    });

    return dp[max];
}

let part2 = findNumberOfValidAdapterConfigs(input);
console.log(part2);